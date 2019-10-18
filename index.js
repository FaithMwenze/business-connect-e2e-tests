const createTestCafe =  require('testcafe')

const createBrowserConnection = async () => {
    let testcafe = null
    const testcontroller = await createTestCafe('localhost');
    testcafe = testcontroller
    const runner = testcafe.createRunner();  
    
    try{
       return  runner.src("./Tests/")
                   .browsers(['chrome'])
                    .run()
                    .then(failedCount => {
                        console.log('Tests failed: ' + failedCount);
                        testcafe.close();
                    });
               
    }catch(error){
        testcafe.close()
        throw new Error(error)
    }
}
createBrowserConnection()