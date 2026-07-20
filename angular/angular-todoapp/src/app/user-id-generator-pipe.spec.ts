import { UserIdGeneratorPipe } from './user-id-generator-pipe';

describe('UserIdGeneratorPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdGeneratorPipe();
    expect(pipe).toBeTruthy();
  });
});
