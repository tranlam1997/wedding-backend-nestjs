import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'default.yaml';

export default () => {
    return yaml.load(
        readFileSync(join(process.cwd(), `/config/${YAML_CONFIG_FILENAME}`), 'utf8'),
    ) as Record<string, any>;
  };