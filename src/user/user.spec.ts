import { Test, TestingModule } from "@nestjs/testing";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("User Controller Test", () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("shoud be defined", () => {
    expect(controller).toBeDefined();
  });
});
