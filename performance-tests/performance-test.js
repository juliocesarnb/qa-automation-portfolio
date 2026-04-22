import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

const baseUrl = __ENV.PERFORMANCE_BASE_URL || 'https://petstore.swagger.io/v2/pet';

export default function () {
  const petId = Number(`${Date.now()}${__VU}${__ITER}`);
  const payload = JSON.stringify({
    id: petId,
    name: `k6-pet-${petId}`,
    photoUrls: [`https://example.com/perf/${petId}.jpg`],
    status: 'available'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const createResponse = http.post(baseUrl, payload, params);
  check(createResponse, {
    'POST status is 200': (response) => response.status === 200,
    'POST response time is under 500ms': (response) => response.timings.duration < 500
  });

  const getResponse = http.get(`${baseUrl}/${petId}`);
  check(getResponse, {
    'GET status is 200': (response) => response.status === 200,
    'GET response time is under 500ms': (response) => response.timings.duration < 500
  });

  http.del(`${baseUrl}/${petId}`);
  sleep(1);
}
