import { SetMetadata } from '@nestjs/common';

// Set metadata to indicate that this route should bypass JWT validation
export const Public = () => SetMetadata('isPublic', true);
