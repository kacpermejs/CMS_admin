import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConfigService, AppConfig } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies no unmatched HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and set configuration', async () => {
    const mockConfig: AppConfig = {
      Environment: 'TEST',
    };

    // Call the method
    const setConfigPromise = service.setConfig();

    // Mock the HTTP request
    const req = httpMock.expectOne('./app-config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);

    await setConfigPromise;

    // Verify the configuration was set
    expect(service.readConfig()).toEqual(mockConfig);
  });

  it('should use default configuration if HTTP request fails', async () => {
    // Call the method
    const setConfigPromise = service.setConfig();

    // Mock the HTTP request with a simulated error using HttpErrorResponse
    const req = httpMock.expectOne('./app-config.json');
    req.flush(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });

    await setConfigPromise;

    // Verify the default configuration is still in use
    expect(service.readConfig()).toEqual({
      Environment: 'DEV',
    });
  });
});
