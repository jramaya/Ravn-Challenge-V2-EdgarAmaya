import { SetMetadata } from '@nestjs/common';

export const OnlyManager = () => SetMetadata('role', 'MANAGER');
