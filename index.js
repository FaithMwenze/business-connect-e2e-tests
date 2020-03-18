require('./env');

const createTestCafe =  require('testcafe')
require('./dataDrivenData')

const createBrowserConnection = async() => {
    let testcafe = null
    createTestCafe('127.0.0.1')
        .then(tc =>{
            testcafe = tc 
        const runner = testcafe.createRunner()
            return  runner
                        .src("Tests/UserConfigurations/SuperAdmin/rejectUser.js")
                        .reporter(['spec', {
                                name: 'json',
                                output: 'reports/report.json'
                                }])
                        .screenshots({
                            path: "./screenshots",
                            takeOnFails: true,
                            pathPattern: "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"    
                            })
                        .browsers("chrome")
                        .run({disablePageCaching: true})
        })        
        .then(failedCount => {
            console.log('Tests failed ' + failedCount);
            testcafe.close();
            process.exit(1);
        })
        .catch(error => {
            console.log("heeeey", error)
            throw new Error(error)
        })
               
}

createBrowserConnection();