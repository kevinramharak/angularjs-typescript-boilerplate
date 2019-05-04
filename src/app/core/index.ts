import module from './core.module';
import config from './core.config';
import run from './core.run';

import env from '@env';

module.config(config);
module.run(run);
module.constant('env', env);

export default module;
