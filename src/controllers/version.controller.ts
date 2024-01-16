import { Request, Response } from "express";
import { VersionService } from "../service/version.service";

export class VersionController {
    private readonly versionService: VersionService

	constructor(versionService: VersionService) {
		this.versionService = versionService
	}

    async getVersion(request: Request, response: Response) {
        const versionService = this.versionService;
        
        const version = await versionService.getVersion();
        console.log(`Retrieved version: ${version}`);

        response.status(200).json(version);
    }
}
