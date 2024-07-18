import router from "../router/index.ts";
import {months} from "@/helper/const.js";

export const linkTo = (pageName,id=null) => {

    setTimeout(()=>{
        router.push({
            name: pageName,
            params: id?{id:id}:{},
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    },300)
};

export const getMonthText=(inputDate)=>{

    const date = new Date(inputDate);
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `Отчет для ${monthName} ${year}`;


}

export const removeNullOrEmpty=(obj)=> {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([_, value]) => value !== null && value !== undefined && value !== ''
        )
    );
}

export const getYearMonth = (isPreviousMonth = false)=> {
    const date = new Date();

    if (isPreviousMonth) {
        date.setMonth(date.getMonth() - 1);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-11
    return `${year}-${month}`;
}

export const fakeBonuses = (data) => {


    return Object.keys(data).map((manager) => {
        const entries=data[manager]
        console.log(entries,manager)
        const items = entries.map(entry => ({
            lk: entry.contact_name + ' ( '+ entry.contact_id.toString() + ' )',
            name: entry.manager_name,
            deposit: `${entry.deposit} ₽`,
            lots: entry.volume_lots.toString(),
            bonus_this_month: `${entry.bonus} ₽`,
            potential_bonus: `${entry.potential_bonus} ₽`,
            to_pay: `${entry.payoff} ₽`,
            paid: `${entry.paid} ₽`,
            manager: entry.manager_name,
            manager_branch: entry.manager_branch // Assuming department is the same for all entries
        }));

        const totalDeposit = items.reduce((acc, item) => acc + parseFloat(item.deposit), 0).toFixed(2);
        const totalLots = items.reduce((acc, item) => acc + parseFloat(item.lots), 0).toFixed(2);
        const totalBonusThisMonth = items.reduce((acc, item) => acc + parseFloat(item.bonus_this_month), 0).toFixed(2);
        const totalPotentialBonus = items.reduce((acc, item) => acc + parseFloat(item.potential_bonus), 0).toFixed(2);
        const totalToPay = items.reduce((acc, item) => acc + parseFloat(item.to_pay), 0).toFixed(2);
        const totalPaid = items.reduce((acc, item) => acc + parseFloat(item.paid), 0).toFixed(2);

        console.log(items)
        return {
            name: manager,
            deposit: `${totalDeposit} ₽`,
            lots: totalLots,
            bonus_this_month: `${totalBonusThisMonth} ₽`,
            potential_bonus: `${totalPotentialBonus} ₽`,
            to_pay: `${totalToPay} ₽`,
            paid: `${totalPaid} ₽`,
            items:items
        };
    });
};