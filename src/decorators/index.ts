import { FastifyInstance } from 'fastify';
import { authenticateDecorator } from '@/utils/jwt';

export function addDecorators(instance: FastifyInstance) {
  instance.decorate("authenticate", authenticateDecorator);
}