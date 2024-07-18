export const fake_bills = [
    {
        "login": "1100069782",
        "lk": "308873",
        "currency": "RUB",
        "deposit": 0.0,
        "withdrawal": 0.0,
        "volumeLots": 0.0,
        "equity": 0.0,
        "balance_start": 0.0,
        "balance_end": 0.0,
        "result": "отсутствует",
        "client": ""
    },
    {
        "login": "1100069782",
        "lk": "308873",
        "currency": "RUB",
        "deposit": 0.0,
        "withdrawal": 0.0,
        "volumeLots": 0.0,
        "equity": 0.0,
        "balance_start": 0.0,
        "balance_end": 0.0,
        "result": "отсутствует",
        "client": ""
    },
    {
        "login": "1100069782",
        "lk": "308873",
        "currency": "RUB",
        "deposit": 0.0,
        "withdrawal": 0.0,
        "volumeLots": 0.0,
        "equity": 0.0,
        "balance_start": 0.0,
        "balance_end": 0.0,
        "result": "отсутствует",
        "client": ""
    }
];

export const fake_opened_closed_bills = [
    {
        id: 755570,
        login: 1100067763,
        utm: '24a',
        openTime: '2024-04-24T04:30:01',
        closeTime: '2024-04-24T23:59:59',
        action: 'sell',
        symbol: 'AUDCADrfd',
        volume: 0.05,
        cost: 0.88,
        reason: 'Client',
        floatingResult: -9.52,
        currency: 'USD',
        position: 1035580072,
        client: 'Никита Зименко',
        manager: 'Бурик Сергей',
        department: 'Санкт-Петербург',
        group: 'DLG - Атлантик Сити'
    },
    {
        id: 755569,
        login: 1100057681,
        utm: '24',
        openTime: '2024-04-23T09:47:27',
        closeTime: '2024-04-23T23:59:59',
        action: 'buy',
        symbol: 'USDMXNrfd',
        volume: 2.0,
        cost: 17.13,
        reason: 'Client',
        floatingResult: -775.31,
        currency: 'USD',
        position: 1035497076,
        client: 'Александр Плетнев',
        manager: 'Зуев Владимир',
        department: 'Самара',
        group: 'OFC - Скала Холл'
    },
    {
        id: 755568,
        login: 1100057402,
        utm: '24',
        openTime: '2024-04-24T11:49:33',
        closeTime: '2024-04-24T23:59:59',
        action: 'buy',
        symbol: 'EURGBPrfd',
        volume: 0.02,
        cost: 0.85,
        reason: 'Client',
        floatingResult: -3.61,
        currency: 'RUB',
        position: 1035548956,
        client: 'Сергей Боков',
        manager: 'Зуев Владимир',
        department: 'Самара',
        group: 'OFC - Скала Холл'
    }
];

export const fake_histories = [
    {
        id: 36,
        name: 'Отчёт за Апрель 2024',
        created_at: '2024-05-14T11:16:31.266'
    },
    {
        id: 35,
        name: 'Отчёт за Март 2024',
        created_at: '2024-04-05T11:53:02.941'
    },
    {
        id: 34,
        name: 'Отчёт за Февраль 2024',
        created_at: '2024-03-07T12:55:16.469'
    },
    {
        id: 33,
        name: 'Отчёт за Январь 2024',
        created_at: '2024-02-09T16:35:02.182'
    },
    {
        id: 32,
        name: 'Отчёт за Декабрь 2023',
        created_at: '2024-01-10T10:43:14.031'
    }
];

export const fake_ratings = [
    {
        id: "#676095",
        name: "Зуев Владимир",
        placeInRanking: 1,
        photo: "https://picsum.photos/200",
        in: "93521 $",
        sht: "0 ₽",
        department: "Самара",
        accountType: "Менеджер"
    },
    {
        id: "#4424092",
        name: "Зиновьев Артем",
        placeInRanking: 2,
        photo: "https://picsum.photos/600",  // Replace with actual image URL or path
        in: "28979 $",
        sht: "0 ₽",
        department: "Санкт-Петербург",
        accountType: "Менеджер"
    },
    {
        id: "#4430605",
        name: "Скрябин Сергей",
        placeInRanking: 3,
        photo: "https://picsum.photos/500",  // Replace with actual image URL or path
        in: "25401 $",
        sht: "0 ₽",
        department: "Самара",
        accountType: "Менеджер"
    },
    {
        id: "#4432801",
        name: "Бурик Сергей",
        placeInRanking: 4,
        photo: "https://picsum.photos/400",  // Replace with actual image URL or path
        in: "17613 $",
        sht: "0 ₽",
        department: "Санкт-Петербург",
        accountType: "Менеджер"
    },
    {
        id: "#4413290",
        name: "Армен Гагикович",
        placeInRanking: 5,
        photo: "https://picsum.photos/300",  // Replace with actual image URL or path
        in: "17221 $",
        sht: "0 ₽",
        department: "Самара",
        accountType: "Адвайзер"
    }
];

export const fake_bonuses = [
    {
        lk: "250498",
        name: "Меркулов Игорь",
        deposit: "12142.04 $",
        lots: "5.96",
        bonus_this_month: "242.84 $",
        potential_bonus: "20678.95 ₽",
        to_pay: "520.30 ₽",
        paid: "0 ₽",
        items:[
            {
                lk: "311589",
                name: "Меркулов Игорь",
                deposit: "195.05 $",
                lots: "0.96",
                bonus_this_month: "2.29 $",
                potential_bonus: "116.10 ₽",
                to_pay: "83.81 ₽",
                paid: "0 ₽",
                manager: "Меркулов Игорь",
                department: "Санкт-Петербург"
            },
            {
                lk: "311589",
                name: "Меркулов Игорь",
                deposit: "500.00 $",
                lots: "5.00",
                bonus_this_month: "229.10 $",
                potential_bonus: "19565.30 ₽",
                to_pay: "435.49 ₽",
                paid: "0 ₽",
                manager: "Меркулов Игорь",
                department: "Санкт-Петербург"
            },
            {
                lk: "313223",
                name: "Меркулов Игорь",
                deposit: "572.74 $",
                lots: "0.00",
                bonus_this_month: "11.45 $",
                potential_bonus: "999.55 ₽",
                to_pay: "0.00 ₽",
                paid: "0 ₽",
                manager: "Меркулов Игорь",
                department: "Санкт-Петербург"
            },
        ]
    },
    {
        lk: "284993",
        name: "Буян Алексей",
        deposit: "492.55 $",
        lots: "3.89",
        bonus_this_month: "9.15 $",
        potential_bonus: "1540.27 ₽",
        to_pay: "203.40 ₽",
        paid: "925.73 ₽",
        items:[
            {
                lk: "284993",
                deposit: "458.19 $",
                lots: "1.57",
                bonus_this_month: "9.15 $",
                potential_bonus: "4241.97 ₽",
                to_pay: "133.47 ₽",
                paid: "137.06 ₽",
                manager: "Буян Алексей",
                department: "Санкт-Петербург"
            },
            {
                lk: "298774",
                deposit: "434.87 $",
                lots: "2.33",
                bonus_this_month: "9.15 $",
                potential_bonus: "1671.13 ₽",
                to_pay: "27.63 ₽",
                paid: "26.63 ₽",
                manager: "Буян Алексей",
                department: "Санкт-Петербург"
            }
        ]
    },
];

