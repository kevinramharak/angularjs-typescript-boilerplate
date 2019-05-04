import module from './router.module';
import config from './router.config';
import run from './router.run';

module.config(config);
module.run(run);

export default module;
