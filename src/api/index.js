import { Router } from 'express';
import fibonacci from './fibonacci'
import reverseWords from './reverse-words';
import triangleType from './triangle-type';

export default () => {
	let api = Router();

  api.get('/Fibonacci', fibonacci);

  // GET /api/ReverseWords
	api.get('/ReverseWords', reverseWords);

  // GET /api/Token
	api.get('/Token', (req, res) => res.json("bf35aa85-8dc3-46a2-9bfc-6adc64baf534"));

  // GET /api/TriangleType
	api.get('/TriangleType', triangleType);

	return api;
}
