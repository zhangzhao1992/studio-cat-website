# STUDIO CAT 猫庐映画官网

这是根据 `猫庐映画公司介绍.pdf` 与 `2025年作品 全案制作案例.docx` 制作的静态公司官网，可直接发布到 GitHub Pages。

## 页面内容

- 公司介绍、服务能力、团队履历、作品案例、合作经验
- PDF 最后一页的联系方式与两个微信二维码
- 电话、邮箱、微信二维码直联合作联系人

## GitHub Pages 发布

仓库推送到 GitHub 后，已内置 `.github/workflows/pages.yml` 自动发布配置。进入 GitHub 仓库的 `Settings > Pages`，将 Source 设置为 `GitHub Actions`，之后推送到 `main` 分支即可自动上线。

## 自定义域名

当前自定义域名配置为 `studiocat.cn`，对应仓库根目录的 `CNAME` 文件。
