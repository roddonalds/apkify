const sjs = require('shelljs');

sjs.config.silent = true;

;(() => {

    // first exec right away
    main();

    // next execs every 5 minutes
    setInterval(() => {
        main();
    }, 1000 * 60 * 5);

})();

function main () {
    
    const c1 = 'cd /root/app',
            c2 = 'git add .',
            c3 = 'git commit -m updev',
            c4 = 'git push origin dev';

    sjs.exec(`${c1} && ${c2} && ${c3} && ${c4}`);
}