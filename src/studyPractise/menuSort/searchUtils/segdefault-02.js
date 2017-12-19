/**
 * Created by jkwu on 17-12-16.
 */
var data = [
  {
    'Id': '1',
    'Name': '教学素材管理',
    'children': [
      {
        'Id': '1-1',
        'Name': '教学素材',
        'children': [
          {
            'Id': '1-1-1',
            'Name': '修改'
          },
          {
            'Id': '1-1-2',
            'Name': '添加'
          }
        ]
      },
      {
        'Id': '1-2',
        'Name': '测试试题'
      },
      {
        'Id': '1-3',
        'Name': '问题任务'
      }
    ]
  },
  {
    'Id': '0',
    'Name': '基础数据管理',
    'children': [
      {
        'Id': '0-1',
        'Name': '专业设置'
      },
      {
        'Id': '0-2',
        'Name': '专业管理'
      }
    ]
  }
];

console.log(JSON.stringify(data));


// 类似于广度遍历
function flatten (data) {
  console.log('data' + data);
  return data.reduce(function(arr, {Id, Name, children = []}) {
     return arr.concat([{Id, Name}], flatten(children))
  }, [])
}

console.log(flatten (data));