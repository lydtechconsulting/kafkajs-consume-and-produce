import { App } from "../../src/app";

describe("integration", () => {
    test("should work", () => {
        expect(1).toBeTruthy();

        new App().start();
    });
});
