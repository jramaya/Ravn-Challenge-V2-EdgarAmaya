import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'User logged in' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginInput: LoginInput) {
        const { email, password } = loginInput;
        const token = await this.authService.login(email, password);
        if(!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { accessToken: token };
    }
}