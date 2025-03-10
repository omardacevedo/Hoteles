module.exports = function (grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin'
    });
	grunt.initConfig({
        sass:{
            dist:{
                files: [{
                    expand:true,
                    cwd:'css',
                    src:['*.scss'],
                    ext:'.css'
                }]
            }
        },
        watch:{
            files:['css/*.scss'],
            task: ['css']
        },
        browserSync:{
            dev:{
                bsFile:{//browser file
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                Options: {
                    watchTask:true,
                    server: {
                        baseDir:'./'//Directorio Base para nuestro servidor
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand:true,
                    cwd:'./',
                    src: 'img/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },
        copy:{
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd:'./',
                    src: ['*.html'],
                    dest:'dist'
                }]
            },
        },
        clean:{
            build:{
                src:['dist/']
            }
        },
        cssmin: {
            dist:{}
        },
        filerev: {
            options:{
                enconding:'utf8',
                algorithm:'md5',
                length:20
            },
            release: {
                //filerev:release hashes(md5)all assets,js
                //in dist directory
                files:[{
                    src:[
                    'dist/js/*.js',
                    'dist/css/*.css',                
                ]
            }]
        }
    },
    concat:{
        options: {
            separator: ';'
        },
        dist: {}
    },
    useminPrepare:{
        foo: {
            dest: 'dist',
            src: ['index.html','about.html','precios.html','contacto.html','Terminos.html']
        },
        options:{
            flow:{
                steps: {
                    css:['cssmin'],
                    js:['uglify']
                },
                post: {
                    css: [{
                        name:'cssmin',
                        createConfig:function(context, block){
                            var generated= context.options.generated;
                            generated.options = {
                                keepSpecialComments: 0,
                                rebase: false
                            }
                        }
                    }]
                }
            }
        }
    },
    usemin: {
        html:['dist/index.html','dist/about.html','dist/precio.html','dist/contacto.html','dist/Terminos.html'],
        options: {
            assetsDir: ['dist','dist/css','dist/js']
        }
    }
});

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browsersSync', 'watch'])
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])
};
