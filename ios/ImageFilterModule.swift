//
//  ImageFilterModule.swift
//  Samplew
//
//  Created by latrandasys on 20/08/25.
//

import Foundation
import UIKit
import CoreImage
import React

@objc(ImageFilterModule)
class ImageFilterModule: NSObject {

  // Apply filters to image based on passed saturation, hue, and brightness values
  @objc func applyFiltersToImage(
    imagePath: String,
    saturation: CGFloat,
    hue: CGFloat,
    brightness: CGFloat,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    // Get the image
    print(imagePath,saturation,hue, brightness)
    let cleanPath = imagePath.replacingOccurrences(of: "file://", with: "")
    guard let image = UIImage(contentsOfFile: cleanPath) else {
      rejecter("ERROR", "Image not found", nil)
      return
    }
    
    // Create a Core Image context
    let ciImage = CIImage(image: image)
    let context = CIContext(options: [:])  // Fixed nil error

    // Apply the filters
    guard let filter = CIFilter(name: "CIColorControls") else {
      rejecter("ERROR", "Failed to create filter", nil)
      return
    }

    filter.setValue(ciImage, forKey: kCIInputImageKey)
    filter.setValue(saturation, forKey: kCIInputSaturationKey)
    filter.setValue(brightness, forKey: kCIInputBrightnessKey)
    
    // Apply hue (CIHueAdjust)
    let hueAdjust = CIFilter(name: "CIHueAdjust")
    hueAdjust?.setValue(filter.outputImage, forKey: kCIInputImageKey)
    hueAdjust?.setValue(hue, forKey: kCIInputAngleKey)
    
    // Get the final output
    if let outputImage = hueAdjust?.outputImage, let cgImage = context.createCGImage(outputImage, from: outputImage.extent) {
      let finalImage = UIImage(cgImage: cgImage)
      
      // Save image to temporary directory
      let tempDirectory = FileManager.default.temporaryDirectory
      let uniqueFileName = "filtered_image_\(UUID().uuidString).png"
      let tempUrl = tempDirectory.appendingPathComponent(uniqueFileName)
      if let data = finalImage.pngData() {
        try? data.write(to: tempUrl)
        resolver(tempUrl.path)
      } else {
        rejecter("ERROR", "Failed to save filtered image", nil)
      }
    } else {
      rejecter("ERROR", "Image processing failed", nil)
    }
  }

  // Expose the method to React Native
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc(applyFilters:saturation:hue:brightness:resolver:rejecter:)
  func applyFilters(
    imagePath: String,
    saturation: CGFloat,
    hue: CGFloat,
    brightness: CGFloat,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  )
{
    self.applyFiltersToImage(imagePath: imagePath, saturation: saturation, hue: hue, brightness: brightness, resolver: resolver, rejecter: rejecter)
  }
}
