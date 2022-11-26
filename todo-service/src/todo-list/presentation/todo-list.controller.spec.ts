import { Test, TestingModule } from '@nestjs/testing';
import { IMTodoListRepository } from '../infra/im-todo-list-repository.service';
import { TodoListController } from './todo-list.controller';

describe('TodoListController', () => {
  let controller: TodoListController;

  describe('createTodoList', () => {
    describe('normal', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [TodoListController],
          providers: [
            {
              provide: 'TodoListRepository',
              useClass: IMTodoListRepository,
            },
          ],
        }).compile();
        controller = module.get<TodoListController>(TodoListController);
      });

      it('can create', async () => {
        expect(await controller.createTodoList({ name: 'test' })).toEqual({
          todoListId: expect.any(String),
        });
      });
    });

    describe('error', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [TodoListController],
          providers: [
            {
              provide: 'TodoListRepository',
              useClass: IMTodoListRepository,
            },
          ],
        }).compile();
        controller = module.get<TodoListController>(TodoListController);
      });
    });
  });
});
