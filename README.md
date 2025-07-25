# px2style
Pickles 2 CSS components.


## Install

Install with npm.

```bash
$ npm install --save px2style
```

Install with composer.

```bash
$ composer require pickles2/px2style
```

## Custom Properties

```scss
:root {
	--px2-font-family: "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "Helvetica Neue", "Arial", sans-serif;
	--px2-main-color: #00a0e6;
	--px2-text-color: #333;
	--px2-background-color: #f9f9f9;
	--px2-border-color: #f0f0f0;
}
```

## Change log

### px2style v3.5.2 (2025年7月12日)

- `.px2-form-input-list`, `.px2-vertical-list`, `.px2-horizontal-list`, `.px2-note-list`, および テーマスタイル の微修正。
- `.px2-image-slider` の重なり順に関する問題を修正。

### px2style v3.5.1 (2025年5月9日)

- `.px2-viewport-fit` のレイアウトが崩れる場合がある問題を修正。

### px2style v3.5.0 (2025年4月3日)

- `.px2-viewport-fit` のポリシーを変更: フィットさせる処理はテーマによる拡張に委ねることにした。

### px2style v3.4.3 (2025年3月5日)

- `px2-btn`, `px2-a` について、デバイスによるスタイリングの差異を修正。
- `px2-linklist` と ショルダーメニュー付き見出し の組み合わせで、ショルダーメニューが表示されない不具合を修正。

### px2style v3.4.2 (2024年12月28日)

- `px2-modal`: スクロールロックが無効になっていた不具合を修正。

### px2style v3.4.1 (2024年12月25日)

- プレースホルダ画像を `broccoli.getNoimagePlaceholder()` から取得するようになった。
- コンテナクエリ導入に関する不具合の修正。

### px2style v3.4.0 (2024年11月1日)

- `px2style.closeModal()`、 `modal.close()` の第一引数が、 `onclose()` の引数として呼び出し側に返されるようになった。
- 目次モジュール `:lists/index` の編集中の表示を英語化した。
- メディアクエリで制御されていたモジュールを、コンテナクエリでの制御に移行した。
- その他、いくつかの細かい改善。

### px2style v3.3.0 (2024年9月10日)

- Image List フィールドを追加。
- Image Slider モジュールを追加。
- 従来のカルーセルモジュールに非推奨フラグを追加。
- `px2-modal`: タブキー操作に関する動作の改善。
- `px2-modal` の `contentFill` オプションを有効にした場合のDOM構造を変更した。
- 画像フィールドの `filenameAutoSetter` オプションのデフォルトを、 従来の `ifEmpty` から `random` に変更した。
- 画像フィールドの `format` オプションが、デフォルトで `image/webp` に変換されるようにした。
- 画像フィールドの `format` オプションに、フォーマット変換を行わない Boolean `false` または String `pass` の設定を追加した。
- その他、いくつかの細かい改善。

### px2style v3.2.5 (2024年4月30日)

- `px2-modal`: ダークモードでのスタイリングに関する修正。
- `auto` テーマを追加した。
- `px2-horizontal-list` のマージン設定を改善。
- その他、いくつかの細かい改善。

### px2style v3.2.4 (2023年11月13日)

- `.px2-index-list` を追加。
- `darkmode` テーマを更新した。
- その他、いくつかの細かい改善。

### px2style v3.2.3 (2023年8月29日)

- imageフィールドの自動リサイズ機能で、GIFを登録された場合に変換しないように変更した。

### px2style v3.2.2 (2023年7月14日)

- `px2style.css` に、いくつかのモジュールがビルドされていなかった不具合を修正。
- `px2style.css` とテーマの分離に関する不具合の修正。

### px2style v3.2.1 (2023年6月25日)

- `.px2-viewport-fit` の処理を改善した。
- `.px2-grid` の内容が幅に満たない場合に、中央に揃えられるようになった。

### px2style v3.2.0 (2023年5月1日)

- `.px2-p`、 `.px2-section`、 `.px2-notice`、 `.px2-tabs` のスタイルの修正。
- ベーススタイルシートと defaultテーマ が切り離された。
- `darkmode` テーマを更新した。

### px2style v3.1.2 (2023年4月22日)

- `px2style.form()` を追加。
- `.px2-table.px2-table--dl` を追加。
- `.px2-radio-switch` を追加。
- `.px2-tabs` に、タブの折返しオプションを追加.
- imageフィールドに、登録した画像が自動的にリサイズされる機能を追加した。
- imageフィールドに、`format` オプションを追加した。
- その他、いくつかの細かい改善。

### px2style v3.1.1 (2023年3月11日)

- `.px2-a` のスタイリングを改善。

### px2style v3.1.0 (2023年2月11日)

- モジュールのカテゴリ分けを改善した。
- `px2style__image` フィールドを追加。
- `.px2-linklist` のスタイリングを改善。
- `.px2-grid` に 5/6幅 を追加した。
- `.px2-grid` のマージン設計を改善。
- `.px2-image` から、 `href`, `target` フィールドを削除した。
- 新しいモジュール `.px2-image-banner-link` を追加した。
- bug fix: `.px2-grid` で 3/4幅 が効かない不具合を修正。
- 各Broccoliモジュールに、モジュールIDを明示した。
- その他、いくつかの細かい改善。

### px2style v3.0.2 (2022年12月28日)

- `px2style.modal()` が重ねて開かれたとき、背景色が重なりすぎる問題を修正した。
- `px2style.modal()` について、要素への自動フォーカス機能を改善した。
- `px2style.modal()` に、オプション `height`, `contentFill` を追加。
- `px2style.getOpenedModalCount()` を追加。
- リンクリストのスタイリングを改善。
- 画像モジュールで、拡大画像のモーダルを `px2style.modal()` で開くように修正した。
- その他、細かい内部コードの改善。

### px2style v3.0.1 (2022/11/03)

- `px2style.modal()` のオプションに `onbgclick` を追加した。
- `px2style.modal()` のオプションに `type` を追加した。`drawer-left` と `drawer-right` を追加した。
- `px2style.modal()` で、タイトル、ボタンがない場合に、自動的にヘッダー、フッターを隠すようになった。

### px2style v3.0.0 (2022/10/16)

- Broccoliモジュールを追加し、モジュール機能が統合された。
- `@layer px2style` を導入した。
- `px2style.modal()` で、背景がスクロールされないようにする制御を追加した。
- `px2style.modal()` のコンテナを `dialog` 要素に変更した。
- セクションモジュール `.px2-section` を追加した。
- `.px2-button`、 `.px2-input`、 `.px-input-group`, `.px2-form-input-list` の微調整。
- `.px2-header`、 `.px2-editor-type`、 `.px2-document`、 `.px2-slim` を削除。
- `px2style.setConfig()`、 `px2style.getConfig()` を廃止。
- ダークモードを テーマファイルに分離した。
- その他、いくつかの不具合の修正。

### px2style v2.0.20 (2022/07/11)

- `px2style.modal()` で、特定の操作により、背景にフォーカスを移動できる問題を修正。

### px2style v2.0.19 (2022/06/05)

- `px2style.modal()` で、モーダルを開いた直後に、モーダルのタイトルにフォーカスするようになった。
- `px2style.modal()` に、 `replaceBody()` メソッドを追加。
- `.px2-note`、 `.px2-error` を追加。
- その他、いくつかの不具合の修正。

### px2style v2.0.18 (2022/05/06)

- `.px2-modal` で、閉じるボタンクリック時にフォームを送信してしまうことがある問題を修正。
- `px2style.modal()` は modalオブジェクトを返すようになった。

### px2style v2.0.17 (2022/05/02)

- `.px2-modal` で、フォームロック中に閉じるボタンを隠すようになった。

### px2style v2.0.16 (2021/11/26)

- `.px2-header` で、スモールスクリーンのときにショルダーメニューに収められるグローバルメニューの下に仕切り線を追加した。
- `.px2-editor-type--html-gui` のラベルを GUI から Block に変更。
- `.px2-loading` は `.px2-modal` よりも手前に表示されるようになった。
- `.px2-open-in-new-window` を追加。
- `.px2-modal` のスタイル改善。
- `.px2-notice` のダークモード対応を追加。
- カスタムプロパティが設定されていない場合に、デフォルトの値が適用されるようになった。
- その他いくつかの細かい修正。

### px2style v2.0.15 (2021/06/26)

- `--px2-text-color`、 `--px2-background-color` を追加。

### px2style v2.0.14 (2021/04/28)

- `.px2-modal` に、一時的にフォーム操作をできなくする機能を追加。
- その他いくつかの細かい修正。

### px2style v2.0.13 (2021/04/04)

- ダークモードのコントラストをやや下げた。
- `.px2-modal` に、一時的に閉じれなくする機能を追加。
- `.px2-input` に、エラー表現 `.px2-input--error` を追加。
- フォームの入力リストモジュール `.px2-form-input-list` を追加。
- フォームの送信エリアモジュール `.px2-form-submit-area` を追加。
- その他いくつかの細かい修正。

### px2style v2.0.12 (2021/02/21)

- `.px2-grid` を追加。
- `.px2-modal` に閉じるボタンを追加。
- `.px2-input--block` を追加。
- ダークモード対応 `body.px2-darkmode` を追加。

### px2style v2.0.11 (2020/12/10)

- `.px2-note-list` を追加。
- `.px2-btn` で disabled が有効なとき、マウス操作に反応して見える問題を修正。
- スペルミスの修正: `burette` -> `bullet`
- JavaScriptの初期化オプションに `additionalClassName` を追加。
- ファイル名を変更: `styles.css` -> `px2style.css`, `scripts.js` -> `px2style.js`

### px2style v2.0.10 (2020/08/12)

- `.px2-btn--toggle-on` を追加。
- `.px2-input` を追加。
- `.px2-input-group` を追加。

### px2style v2.0.9 (2020/05/10)

- `.px2-notice` を追加。
- `px2style.flashMessage()` を追加。
- `.px2-modal` のスタイリングを改善。
- `px2style.modal()` で、タブキー操作に関する制御を改善。
- `px2style.modal()` が、ESCキーで閉じるようになった。
- `px2style.modal()` に、オプション `onclose` を追加。
- `px2style.modal()` が、多重に開けるようになった。

### px2style v2.0.8 (2020/03/14)

- `.px2-modal` のスタイリングを改善。
- `px2style.modal()` に、オプション `buttonsSecondary` を追加。

### px2style v2.0.7 (2019/12/13)

- `.px2-btn` が、 macOS Catalina で適切なフォントで表示されない問題を修正。
- ユーティリティ `.px2-font-size-ll`, `.px2-font-size-l`, `.px2-font-size-s`, `.px2-font-size-ss` を追加。
- ユーティリティ `.px2-text-align-left`, `.px2-text-align-center`, `.px2-text-align-right` を追加。
- `.px2-vertical-list` を追加。
- その他いくつかの細かい修正。

### px2style v2.0.6 (2019/07/17)

- `.px2-header` で、サブメニューの開閉制御に関わる問題を修正。
- `.px2-header` が、小さい画面のときを考慮してスタイルが変化するようになった。
- `.px2-header` で、ハンバーガーメニューの書き方を修正。

### px2style v2.0.5 (2019/05/28)

- `px2style.message()` を `px2style.loadingMessage()` に改名した。

### px2style v2.0.4 (2019/05/27)

- `.px2-header` を追加。
- `px2style.loading()`、 `px2style.message()`、 `px2style.closeLoading()` を追加。
- その他いくつかの細かい修正。

### px2style v2.0.3 (2019/01/13)

- `.px2-link` を追加。
- `.px2-link.px2-link--burette` を追加。
- `.px2-editor-type` に `alias` を追加。
- `.px2-editor-type__***` を `.px2-editor-type.px2-editor-type--***` に変更。(ただし古い書き方も互換性維持のため残します)
- List カテゴリを追加。
- ボタンアクションに "押した感触" を追加。
- `px2-modal` に `form` オプションを追加。

### px2style v2.0.2 (2017/05/30)

- `.px2-table` を追加。
- `.px2-document` を追加。
- `.px2-p` を追加。
- `.px2-slim` を追加。
- `.px2-responsive` を追加。
- `px2style.modal()` に、オプション `width` を追加。

### px2style v2.0.1 (2017/04/11)

- ボタンの背景色を不透過にした。
- `px2-modal` を追加。
- JavaScriptオブジェクト名を `window.px2style` に変更。

### px2style v2.0.0 (2016/09/17)

- Initial Release.


## License

MIT License


## Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <https://www.pxt.jp/>
- Twitter: @tomk79 <https://twitter.com/tomk79/>
