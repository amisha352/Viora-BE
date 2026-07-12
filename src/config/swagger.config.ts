import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export function buildSwaggerDocument() {
  return new DocumentBuilder()
    .setTitle('Viora Learning Platform API')
    .setDescription(
      'Enterprise Interactive Learning Platform — Modular Monolith API. ' +
        'Supports concepts, learning experiences, activities, assessments, and progress tracking.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .addTag('Auth', 'Authentication and token management')
    .addTag('Users', 'User profile and management')
    .addTag('Subjects', 'Top-level learning domains')
    .addTag('Concepts', 'Recursive concept hierarchy')
    .addTag('Experiences', 'Learning experiences (simulations, games, etc.)')
    .addTag('Activities', 'Interactive activities within experiences')
    .addTag('Assessments', 'Assessments and questions')
    .addTag('Progress', 'Learner progress tracking')
    .addTag('Assets', 'Media and file metadata')
    .addTag('Analytics', 'Learning analytics')
    .addTag('Search', 'Cross-domain search')
    .build();
}

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
};
