import module from './home.module';
import config from './home.config';
import controller from './home.controller';

module.config(config);
module.controller(controller.name, controller);

export default module;
