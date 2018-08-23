import { TestBed, inject } from '@angular/core/testing';

import { InstallerService } from './installer.service';

describe('InstallerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstallerService]
    });
  });

  it('should be created', inject([InstallerService], (service: InstallerService) => {
    expect(service).toBeTruthy();
  }));
});
