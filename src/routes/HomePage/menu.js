import { Icon } from 'antd'
export default [{
    key: 'sub1',
    title: <span>
        <Icon type="user" />
        学员后台
  </span>,
    options: [{
        name: '匿名投诉',
        ads: '/home/etable'
    },
    {
        name: '技术问题',
        ads: '/home/problem'
    },
    {
        name: '项目上传',
        ads: '/home/itemupload'
    },
    {
        name: 'Vip',
        ads: '/home/Vip'
    }, {
        name: '学院周报',
        ads: '/home/weekly'
    },
    {
        name: '我的资料',
        ads: '/home/mine'
    },
    {
        name: '交费明细',
        ads: '/home/moneyDetail'
    }, {
        name: '参加考试',
        ads: '/home/Exam'
    }, {
        name: '学员评价',
        ads: '/home/evaluate'
    }, {
        name: '教学测评',
        ads: '/home/Inquiry'
    },],
},
{
    key: 'sub2',
    title: <span>
        <Icon type="laptop" />
        学员考勤
  </span>,

    options: [{
        name: '学员请假',
        ads: '/home/leave'
    },
    {
        name: '学员违纪',
        ads: '/home/discipline'
    },
    ],
}]