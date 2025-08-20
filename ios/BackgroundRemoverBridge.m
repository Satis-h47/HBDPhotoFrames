//
//  BackgroundRemoverBridge.m
//  Samplew
//
//  Created by latrandasys on 07/06/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BackgroundRemover, NSObject)

RCT_EXTERN_METHOD(removeBackground:(NSString *)imagePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
