function checkCashRegister(price, cash, cid) {
    var change = cash - price;
    var changeCopy = change;
    var changeCheck = 0;
    var changeArray = [];
    var status = {status: null, change: []};
    var denom = [
        { name: 'ONE HUNDRED', val: 100.00},
        { name: 'TWENTY', val: 20.00},
        { name: 'TEN', val: 10.00},
        { name: 'FIVE', val: 5.00},
        { name: 'ONE', val: 1.00},
        { name: 'QUARTER', val: 0.25},
        { name: 'DIME', val: 0.10},
        { name: 'NICKEL', val: 0.05},
        { name: 'PENNY', val: 0.01}
    ];

    var register = cid.reduce(function(acc, curr) {
        acc.total += curr[1];
        acc[curr[0]] = curr[1];
        return acc;
    }, {total: 0});

    if(register.total === change) {
        status.status = 'CLOSED';
        status.change = cid;
        return status;
    }

    if(register.total < change) {
        status.status = 'INSUFFICIENT_FUNDS';
        return status;
    }

    var change_arr = denom.reduce(function(acc, curr) {
        var value = 0;
        while(register[curr.name] > 0 && change >= curr.val) {
            change -= curr.val;
            register[curr.name] -= curr.val;
            value += curr.val;

            change = Math.round(change * 100) / 100;
        }
        if(value > 0) {
            acc.push([ curr.name, value ]);
        }
        return acc;
    }, []);

    if(change_arr.length < 1 || change > 0) {
        status.status = 'INSUFFICIENT_FUNDS';
        return status;
    }

    status.status = 'OPEN';
    status.change = change_arr;
    return status;
}

console.log(checkCashRegister(10, 20, [['ONE', 5], ['FIVE', 10], ['TEN', 20]]));
console.log(checkCashRegister(15, 50, [['ONE', 10], ['FIVE', 20], ['TEN', 30]]));
console.log(checkCashRegister(25, 100, [['ONE', 20], ['FIVE', 30], ['TEN', 40]]));
console.log(checkCashRegister(30, 70, [['ONE', 15], ['FIVE', 25], ['TEN', 35]]));
console.log(checkCashRegister(5, 10, [['ONE', 2], ['FIVE', 5], ['TEN', 10]]));
