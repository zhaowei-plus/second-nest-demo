import { Body, Controller, Post, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('list')
  async list() {
    return this.companyService.list();
  }

  @Post('delete')
  async delete(@Body() body): Promise<string> {
    return this.companyService.delete(body);
  }
}
