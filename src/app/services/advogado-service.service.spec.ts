import { TestBed } from '@angular/core/testing';

import { AdvogadoServiceService } from './advogado-service.service';

describe('AdvogadoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvogadoServiceService = TestBed.get(AdvogadoServiceService);
    expect(service).toBeTruthy();
  });
});
