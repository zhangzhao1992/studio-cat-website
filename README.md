# STUDIO CAT 猫庐映画官网

这是根据 `猫庐映画公司介绍.pdf` 与 `2025年作品 全案制作案例.docx` 制作的静态公司官网，可直接发布到 GitHub Pages。

## 页面内容

- 公司介绍、服务能力、团队履历、作品案例、合作经验
- PDF 最后一页的联系方式与两个微信二维码
- 客户留言表单，默认提交到 `29998953@qq.com`，并抄送可通过邮件客户端转发给导演邮箱

## 留言记录说明

网站为 GitHub Pages 静态站，不能直接运行数据库。当前表单使用 FormSubmit 邮件提交方案：

1. 首次线上提交会向 `29998953@qq.com` 发送激活邮件。
2. 激活后，客户留言会以邮件形式保存到邮箱，作为后续跟进记录。
3. 如需 CRM、飞书表格、Notion 或自有数据库记录，可把 `index.html` 中 `data-endpoint` 替换为对应接口。

## GitHub Pages 发布

仓库推送到 GitHub 后，已内置 `.github/workflows/pages.yml` 自动发布配置。进入 GitHub 仓库的 `Settings > Pages`，将 Source 设置为 `GitHub Actions`，之后推送到 `main` 分支即可自动上线。
