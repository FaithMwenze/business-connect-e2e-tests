require('./env');

const createTestCafe =  require('testcafe')

global.testData = {};

const createBrowserConnection = async() => {
    console.log('starting browser')
    let testcafe = null
    const testcontroller = await createTestCafe("127.0.0.1", 1337, 1338);

    testcafe = testcontroller
    const runner = testcafe.createRunner();  
    
    try {
        console.log("making a connections")
       return  runner.src("Tests")
                     .reporter(['spec', {
                        name: 'json',
                        output: 'reports/report.json'
                        }])
                    .useProxy("http://192.168.204.70:8080",["*192.168.204*","192.168.204*"])
                     .screenshots({
                        path: "./screenshots",
                        takeOnFails: true,
                        pathPattern: "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"    
                       })
                     .browsers("firefox:headless")
                     .run({disablePageCaching: true})
                    .then(failedCount => {
                        console.log('Tests failed: ' + failedCount);
                        testcafe.close();
                    });
               
    }catch(error){
        console.log("error", error)
        testcafe.close()
        throw new Error(error)
    } 
}

createBrowserConnection();