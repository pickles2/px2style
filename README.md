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


## Change log

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
