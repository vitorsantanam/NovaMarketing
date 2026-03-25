const baseUrl = 'http://localhost:1337/api/services';
const token = '3ae60308103abd892e70f257b58d7907f15512a631afff3b8652eaa290f1acb3d779c51e439b27f9079cee5cc959749b99f93d14417c932c1dfe7c0938db4663e2fab5dd504395119cd412890a2af1158dc520fab5de11ee67d8ea5ec557c1d36ab8be8b0b5205fee0f4dc3cab84bbb9510794a4e64852942eee2309cbe82032';

async function test() {
    // 1. Create Base item (es-ES)
    const resEs = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            data: {
                title: "Test ES-Link",
                slug: "test-es-link",
                locale: "es-ES" // use exactly what subagent added
            }
        })
    });
    const dataEs = await resEs.json();
    console.log("ES Creation:", JSON.stringify(dataEs, null, 2));

    if (dataEs.data && dataEs.data.documentId) {
        const docId = dataEs.data.documentId;
        console.log(`Linking CA translation to documentId: ${docId}`);

        const resCa = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                data: {
                    documentId: docId, // LINKING TRIGGER for Strapi 5!
                    title: "Test CA-Linked",
                    slug: "test-ca-linked",
                    locale: "ca"
                }
            })
        });
        const dataCa = await resCa.json();
        console.log("CA Response:", JSON.stringify(dataCa, null, 2));
    }
}

test();
