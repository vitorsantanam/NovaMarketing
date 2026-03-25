// using Global native fetch Node triggers
async function test() {

    const baseUrl = 'http://localhost:1337/api/services';
    const token = '3ae60308103abd892e70f257b58d7907f15512a631afff3b8652eaa290f1acb3d779c51e439b27f9079cee5cc959749b99f93d14417c932c1dfe7c0938db4663e2fab5dd504395119cd412890a2af1158dc520fab5de11ee67d8ea5ec557c1d36ab8be8b0b5205fee0f4dc3cab84bbb9510794a4e64852942eee2309cbe82032';
    
    // 1. Create ES entry
    const resEs = await fetch(baseUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            data: {
                title: "Test ES",
                slug: "test-es",
                locale: "es"
            }
        })
    });
    
    const dataEs = await resEs.json();
    console.log("ES Response:", JSON.stringify(dataEs, null, 2));
    
    if (dataEs.data && dataEs.data.documentId) {
        const docId = dataEs.data.documentId;
        console.log(`\nNow linking CA translation to documentId: ${docId}`);
        
        // Let's test providing documentId + locale in payload
        const resCa = await fetch(baseUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                data: {
                    title: "Test CA",
                    slug: "test-ca",
                    locale: "ca"
                }
            })
         });
         const dataCa = await resCa.json();
         console.log("CA Response directly:", JSON.stringify(dataCa, null, 2));

         // Test linking endpoint (often /api/services/:id/localizations in v4, and in v5 might be different)
         const resLink = await fetch(`${baseUrl}/${docId}/localizations`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                data: {
                    title: "Test CA Linked",
                    slug: "test-ca-linked",
                    locale: "ca"
                }
            })
         });
         console.log("CA Sub-endpoint Response:", await resLink.text());
    }
}

test();

