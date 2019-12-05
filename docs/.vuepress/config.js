module.exports = {
  base: '/blog/',
  dest: './dist',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/xxxxxxx/blog',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'FirstBlog', link: '/blog/first-blog.md' }
    // ],
    sidebar: [
      {
        title: 'pf-table',   // 必要的
        path: '/',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  // title: 'Hello VuePress',
  // description: 'Just playing around'
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'gitalk',
        options: {
          id: '<%- frontmatter.commentid || frontmatter.permalink %>',
          title: '「Comment」<%- frontmatter.title %>',
          body: '<%- frontmatter.title %>：<%-window.location.origin%><%- window.location.pathname %>',
          clientID: 'bd729577007e51c7024e',
          clientSecret: '2ffab37b6220d89b521a4c2e3d1093bf7ca86ec1',
          repo: 'blog',
          owner: 'pangao66',
          // 这里接受一个数组，可以添加多个管理员
          admin: ['pangao66'],
          distractionFreeMode: false
        }
      }
    ]
  ]
}
