import { applyDecorators, createParamDecorator, ExecutionContext, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ErrorModel } from '../errors/error.model';
export const GetUserId = createParamDecorator((_field, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<any>();
  return request.userId;
});
export function ApiCommonResponse() {
  return applyDecorators(
    HttpCode(200),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorModel }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorModel }),
    ApiBadRequestResponse({ description: 'Something error in business', type: ErrorModel }),
    ApiServiceUnavailableResponse({ description: 'Service Unavailable', type: ErrorModel }),
    ApiInternalServerErrorResponse({ description: 'Internal server Error', type: ErrorModel }),
    ApiNotFoundResponse({ description: 'Not found', type: ErrorModel }),
  );
}
