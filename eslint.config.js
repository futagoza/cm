import { defineConfig } from "eslint/config"
// import futagoza from "../eslint-config-futagozaryuu/packages/@futagoza/eslint-config/index.js"
import { config as IgnoreConfig } from "../eslint-config-futagozaryuu/packages/@futagoza/eslint-config-ignore/index.js"
import node from "../eslint-config-futagozaryuu/packages/@futagoza/eslint-config-node/20.js"
import typescript from "../eslint-config-futagozaryuu/packages/@futagoza/eslint-config-typescript/node.js"

IgnoreConfig.ignores.push( "archived/*", "**/lib/*" )

export default defineConfig( IgnoreConfig, node, typescript )
