import * as SimpleGit from 'simple-git/promise';

const git = SimpleGit();

export class GitValidator {
  readonly MASTER_BRANCH_NAME = 'master1';
  STATUS_IS_NOT_CLEAN_ERROR = 'Please commit all changes first';
  CURRENT_BRANCH_NOT_MASTER_ERROR = 'Current branch must be master1';
  PULL_FROM_MASTER_FAILED_ERROR = 'Pull from origin master failed';

  async isCurrentBranchMaster() {
    const currentBranchName = (await git.branchLocal()).current;
    if (currentBranchName !== this.MASTER_BRANCH_NAME) {
      this.showError(this.STATUS_IS_NOT_CLEAN_ERROR);
      process.kill(process.pid);
    }
    return true;
  }

  async pullFromMaster() {
    await git.pull('origin', this.MASTER_BRANCH_NAME).catch((error) => {
      this.showError(this.PULL_FROM_MASTER_FAILED_ERROR);
      process.kill(process.pid);
    });
    return true;
  }

  async pushChangeToRemote() {
    const currentBranchName = (await git.branchLocal()).current;
    await git.push('origin', currentBranchName, { '-u': true }).catch((error) => {
      this.showError('', error);
      process.kill(process.pid);
    });
    return true;
  }

  async isStatusClean() {
    // Check there is no pending commit
    const status = await git.status();
    if (!status.isClean()) {
      this.showError(this.STATUS_IS_NOT_CLEAN_ERROR);
      process.kill(process.pid);
    }
    return true;
  }

  showError(errorMessage: string, extras?: any) {
    console.error('ERROR: ', { message: errorMessage.toUpperCase() }, extras || '');
  }
}

(async () => {
  console.log('####### GIT VALIDATOR START ####');
  let count = 1;
  function showValid(functionName: string) {
    console.log(`TEST ${count++}`, { [`${functionName}`]: 'PASS' });
  }
  const validator = new GitValidator();

  await validator.isCurrentBranchMaster();
  showValid(validator.isCurrentBranchMaster.name);

  await validator.pullFromMaster();
  showValid(validator.pullFromMaster.name);

  await validator.isStatusClean();
  showValid(validator.isStatusClean.name);

  await validator.pushChangeToRemote();
  showValid(validator.pushChangeToRemote.name);

  console.log('####### GIT VALIDATOR END ####');
})();
