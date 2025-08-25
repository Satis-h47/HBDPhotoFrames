//
//  ImageFilterModuleBridge.m
//  Samplew
//
//  Created by latrandasys on 20/08/25.
//

//#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ImageFilterModule, NSObject)

RCT_EXTERN_METHOD(applyFilters:
(NSString *)imagePath
saturation:(CGFloat)saturation
hue:(CGFloat)hue
brightness:(CGFloat)brightness
resolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)

@end
