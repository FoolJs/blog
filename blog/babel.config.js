module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk',
            },
        ],
        [
            'prismjs',
            {
                //需要的语言种类，
                languages: [
                    'javascript',
                    'css',
                    'html',
                    'nginx',
                    'scss',
                    'md',
                    'ts',
                    'git',
                    'json',
                    'rust',
                    'powershell',
                    'flow',
                ],
                plugins: ['line-numbers'],
                theme: 'base16-ateliersulphurpool.light',
                css: true,
            },
        ],
    ],
};