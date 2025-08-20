//
//  BackgroundRemover .swift
//  Samplew
//
//  Created by latrandasys on 07/06/25.
//

import Foundation
import UIKit
import TensorFlowLite
import React

@objc(BackgroundRemover)
class BackgroundRemover: NSObject {

    private var interpreter: Interpreter?

    override init() {
        super.init()
        loadModel()
    }

    private func loadModel() {
        guard let modelPath = Bundle.main.path(forResource: "selfie_segmenter", ofType: "tflite") else {
            print("Failed to find model file")
            return
        }

        do {
            interpreter = try Interpreter(modelPath: modelPath)
            try interpreter?.allocateTensors()
            print("TFLite model loaded successfully")
        } catch {
            print("Failed to load TFLite model: \(error)")
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc func removeBackground(_ imagePath: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      
      print("removeBackground called")
        
      guard let testImagePath = Bundle.main.path(forResource: "test", ofType: "jpg"),
            let image = UIImage(contentsOfFile: testImagePath) else {
          print("Failed to load test image")
          return
      }

      print("Successfully loaded test image")
        // Resize image to model input size (example: 256x256)
        let inputSize = CGSize(width: 256, height: 256)
        guard let resizedImage = image.resize(to: inputSize) else {
            rejecter("ERR_RESIZE", "Failed to resize image", nil)
            return
        }

        // Convert UIImage to RGB data
        guard let inputData = resizedImage.rgbData() else {
            rejecter("ERR_INPUT", "Failed to convert image to RGB data", nil)
            return
        }

        do {
            // Run inference
            try interpreter?.copy(inputData, toInputAt: 0)
            try interpreter?.invoke()

            let outputTensor = try interpreter!.output(at: 0)
          let maskData = outputTensor.data.withUnsafeBytes {
              Array(UnsafeBufferPointer<Float32>(start: $0.baseAddress!.assumingMemoryBound(to: Float32.self),
                                                 count: outputTensor.data.count / MemoryLayout<Float32>.stride))
          }
            // Post-process mask
            let maskWidth = 256
            let maskHeight = 256

            guard let outputImage = resizedImage.applyMask(mask: maskData, maskWidth: maskWidth, maskHeight: maskHeight) else {
                rejecter("ERR_MASK", "Failed to apply mask", nil)
                return
            }

            // Save to temp PNG
            if let pngData = outputImage.pngData() {
                let outputPath = NSTemporaryDirectory().appending(UUID().uuidString + ".png")
                try pngData.write(to: URL(fileURLWithPath: outputPath))
                resolver(outputPath)
            } else {
                rejecter("ERR_SAVE", "Failed to create PNG data", nil)
            }

        } catch {
            rejecter("ERR_INFERENCE", "Inference failed: \(error)", nil)
        }
    }
}
