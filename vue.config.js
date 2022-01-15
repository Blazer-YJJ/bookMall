module.exports = {
	// webpack配置
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'utils': '@/utils',
				'views': '@/views',
				'network': '@/network'
			}
		}
	},
	// 通用路径
	publicPath: './'
}