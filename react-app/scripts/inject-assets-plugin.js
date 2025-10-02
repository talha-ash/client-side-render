import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import HtmlPlugin from 'html-webpack-plugin'

import pagesManifest from '../src/pages.js'

const __dirname = import.meta.dirname

const getPages = rawAssets => {
    const pages = Object.entries(pagesManifest).map(([chunk, { path, title, data }]) => {
        const scripts = rawAssets.map(({ name }) => name).filter(name => new RegExp(`[/.]${chunk}\\.(.+)\\.js$`).test(name))

        return { path, scripts, title, data }
    })

    return pages
}

class InjectAssetsPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('InjectAssetsPlugin', compilation => {
            HtmlPlugin.getCompilationHooks(compilation).beforeEmit.tapAsync('InjectAssetsPlugin', (data, callback) => {
                const preloadAssets = readFileSync(join(__dirname, '..', 'scripts', 'preload-assets.js'), 'utf-8')
                console.log("preloadAssets", preloadAssets)
                const rawAssets = compilation.getAssets()
                console.log("rawAssets", rawAssets)
                const pages = getPages(rawAssets)
                console.log("pages", pages)

                const stringifiedPages = JSON.stringify(pages, (_, value) => {
                    return typeof value === 'function' ? `func:${value.toString()}` : value
                })

                let { html } = data
                console.log("html", html)
                html = html.replace(
                    '</title>',
                    () => `</title><script id="preload-data">const pages=${stringifiedPages}\n${preloadAssets}</script>`
                )

                callback(null, { ...data, html })
            })
        })
    }
}

export default InjectAssetsPlugin