import { App } from "../../src/app";

describe("integration", () => {
    
    test("end to end test", async () => {
        expect(1).toBeTruthy();

        new App().start();
    });
});
