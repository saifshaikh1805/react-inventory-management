import fire from "./firebaseConfig";
import { dispatchAction, store } from "./redux/all";
import { movementActions } from "./redux/movementsLocations";
import { prodActions } from "./redux/products";

const reduxStore = store;

export const getProdsAndLocations = async () => {
    getLocations();
    getProds();
}

export const getProdsLocationsMovements = () => {
    getProds();
    getLocations();
    getAllMovements();
}

export const getProds = () => {
    fire.firestore().collection('products').onSnapshot(res => {
        dispatchAction(prodActions.SET_PRODS, res.docs.map(x => { return { ...x.data(), id: x.id } }));
    })
}

export const getLocations = () => {
    fire.firestore().collection('locations').onSnapshot(res => {
        dispatchAction(movementActions.SET_LOCS, res.docs.map(x => { return { ...x.data(), id: x.id } }));
    })
}

export const getMovements = async () => {
    let res = await fire.firestore().collection('productMovements').where('prod_id', '==', reduxStore.getState().products.selectedProd.id).get();
    dispatchAction(movementActions.SET_MOVEMENTS, res.docs.map(x => { return Object.assign({}, { id: x.id }, x.data()) }));
    calculateProdQtyInEachLocation();

}

export const calculateProdQtyInEachLocation = () => {
    let qty = reduxStore.getState().movementsLocations.locations.map(x => { return { locId: x.id, locName: x.name, qty: 0 } });
    let movements = reduxStore.getState().movementsLocations.movements.filter(m => m.prod_id === reduxStore.getState().products.selectedProd.id);
    for (let i = 0; i < qty.length; i++) {
        qty[i].qty += movements.filter(x => qty[i].locId === x.to_loc).map(y => y.qty).reduce(((a, b) => a + b), 0);
        qty[i].qty -= movements.filter(x => qty[i].locId === x.from_loc).map(y => y.qty).reduce(((a, b) => a + b), 0);
    }
    qty.total = qty.reduce(((a, b) => a + b.qty), 0);
    dispatchAction(prodActions.SET_SELECTED, { ...reduxStore.getState().products.selectedProd, qty })
}


export const getAllMovements = async () => {
    let res = await fire.firestore().collection('productMovements').get();
    dispatchAction(movementActions.SET_MOVEMENTS, res.docs.map(x => { return Object.assign({}, { id: x.id }, x.data()) }));
    calculateAllProdsQtyInEachLocation();

}

export const calculateAllProdsQtyInEachLocation = () => {
    let movements = reduxStore.getState().movementsLocations.movements;
    let locations = reduxStore.getState().movementsLocations.locations;
    let allProds = [...new Set([...movements].map(x => x.prod_id))].map(y => { return { prodId: y, locs: locations.map(l => { return { id: l.id, name: l.name, qty: 0 } }), total: 0 } });
    for (let i = 0; i < movements.length; i++) {
        if (allProds.find(x => x.prodId === movements[i].prod_id).locs.find(y => y.id === movements[i].to_loc)) {
            allProds.find(x => x.prodId === movements[i].prod_id).locs.find(y => y.id === movements[i].to_loc).qty += movements[i].qty;
            allProds.find(x => x.prodId === movements[i].prod_id).total += movements[i].qty;
        }
        if (allProds.find(x => x.prodId === movements[i].prod_id).locs.find(y => y.id === movements[i].from_loc)) {
            allProds.find(x => x.prodId === movements[i].prod_id).locs.find(y => y.id === movements[i].from_loc).qty -= movements[i].qty;
            allProds.find(x => x.prodId === movements[i].prod_id).total -= movements[i].qty;
        }
    }
    dispatchAction(prodActions.SET_MASTER, allProds);
    organizeFullReportData(allProds);
}

const organizeFullReportData = (reportData) => {
    let organizedReportData = [];
    for (let i = 0; i < reportData.length; i++) {
        let pid = reportData[i].prodId;
        let locArr = reportData[i].locs
        for (let j = 0; j < locArr.length; j++) {
            organizedReportData.push({ prodId: pid, locId: locArr[j].id, qty: locArr[j].qty });
        }
    }
    dispatchAction(prodActions.SET_ORG_MASTER, organizedReportData);
}


export const expexcel = (tableID, filename = '') => {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    // var tableSelect = document.getElementById(tableID);
    var tableSelect = document.getElementsByClassName(tableID)[0];
    var tableHTML = tableSelect.outerHTML.replace(/Move to another location/g,"").replace(/ /g, '%20');
    
     // Specify file name
     filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
    
        //triggering the function
        downloadLink.click();
      }
    }