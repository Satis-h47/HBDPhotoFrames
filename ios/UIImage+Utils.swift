//
//  UIImage+Utils.swift
//  Samplew
//
//  Created by latrandasys on 07/06/25.
//
import Foundation
import UIKit

extension UIImage {
    
    func resize(to targetSize: CGSize) -> UIImage? {
        UIGraphicsBeginImageContextWithOptions(targetSize, false, 1.0)
        draw(in: CGRect(origin: .zero, size: targetSize))
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return resizedImage
    }

    func rgbData() -> Data? {
        guard let cgImage = self.cgImage else { return nil }

        let width = Int(size.width)
        let height = Int(size.height)
        let bytesPerPixel = 3
        let bytesPerRow = bytesPerPixel * width
        let bitsPerComponent = 8

        var rgbData = Data(count: width * height * bytesPerPixel)
        rgbData.withUnsafeMutableBytes { ptr in
            if let context = CGContext(
                data: ptr.baseAddress,
                width: width,
                height: height,
                bitsPerComponent: bitsPerComponent,
                bytesPerRow: bytesPerRow,
                space: CGColorSpaceCreateDeviceRGB(),
                bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
            ) {
                context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
            }
        }

        return rgbData
    }

    func applyMask(mask: [Float32], maskWidth: Int, maskHeight: Int) -> UIImage? {
        guard let cgImage = self.cgImage else { return nil }

        let width = Int(size.width)
        let height = Int(size.height)
        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        let bitsPerComponent = 8

        var pixelData = Data(count: width * height * bytesPerPixel)
        pixelData.withUnsafeMutableBytes { ptr in
            if let context = CGContext(
                data: ptr.baseAddress,
                width: width,
                height: height,
                bitsPerComponent: bitsPerComponent,
                bytesPerRow: bytesPerRow,
                space: CGColorSpaceCreateDeviceRGB(),
                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) {
                context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

                // Apply mask as alpha
                let pixelBuffer = ptr.bindMemory(to: UInt8.self)
                for y in 0..<height {
                    for x in 0..<width {
                        let pixelIndex = (y * width + x) * bytesPerPixel

                        // Map mask coordinates to image coordinates
                        let maskX = x * maskWidth / width
                        let maskY = y * maskHeight / height
                        let maskIndex = maskY * maskWidth + maskX
                        let maskValue = mask[maskIndex]

                        // Hard edge mask
                        let alpha: UInt8 = maskValue > 0.5 ? 255 : 0

                        pixelBuffer[pixelIndex + 3] = alpha
                    }
                }
            }
        }

        let provider = CGDataProvider(data: pixelData as CFData)!
        if let newCGImage = CGImage(
            width: width,
            height: height,
            bitsPerComponent: bitsPerComponent,
            bitsPerPixel: bytesPerPixel * bitsPerComponent,
            bytesPerRow: bytesPerRow,
            space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue),
            provider: provider,
            decode: nil,
            shouldInterpolate: true,
            intent: .defaultIntent
        ) {
            return UIImage(cgImage: newCGImage)
        } else {
            return nil
        }
    }
}
