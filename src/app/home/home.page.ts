import { Component } from '@angular/core';
import { ScanPreferences } from '../scan-preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  public scan() {
    const preferences: ScanPreferences =
    {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the flashlight switched on (if available)
      saveHistory: false, // Android, save scan history (default false)
      prompt: 'Place a barcode inside the scan area', // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
      orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    };

    (window as any).cordova.plugins.barcodeScanner.scan(this.onScanned, this.onError, preferences);
  }

  private onScanned(result) {
    alert(`Scanned: "${result.text}" format: ${result.format}`);
  }

  private onError(error) {
    alert(`Scanning failed: ${error}`);
  }
}
