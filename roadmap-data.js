// J-BOX BV 会計学習ロードマップ - 概念ツリーデータ
// n(id, label, opts, children) - ノード生成ヘルパー
function n(id, label, opts, children) {
  return Object.assign({ id, label, children: children || [] }, opts || {});
}

window.TREE = n('root', 'J-BOX BV', { sub: '会計の全体図', color: '#fbbf24', root: true }, [

// ==================== 1. 基礎フレームワーク ====================
n('foundation', '🏛️ 1. 基礎フレームワーク', { color: '#3b82f6', ch: 1, summary: '会計の土台。誰のためか、どんなルールか、何を測るか。' }, [
  n('f_concept', '概念フレームワーク', { color: '#3b82f6', summary: '会計の前提・原則の集合。' }, [
    n('f_users', 'ユーザー (Internal / External)', { color: '#3b82f6', detail: '内部: 経営者・従業員 / 外部: 投資家・債権者・税務当局・規制当局。J-BOXの場合、Lucas (オーナー) が内部、銀行が外部。', memo: '内部=管理目的、外部=投資・与信判断' }),
    n('f_gaap_ifrs', 'GAAP vs IFRS', { color: '#3b82f6', detail: 'GAAP=米国基準 (rules-based)。IFRS=国際基準 (principles-based)。J-BOX BV はオランダ法人なので IFRS 適用。', memo: 'IFRS=原則主義、IASB が制定。J-BOXはIFRS。', formula: 'IFRS: Inventory LIFO 不可 / Revaluation Model 可 / Effective Interest 必須' }),
    n('f_measure', '測定原則 (Measurement)', { color: '#3b82f6', detail: 'Historical Cost (取得原価) と Fair Value (公正価値) の2つ。一般的にはHistorical Cost、ただし投資・PPEの Revaluation Model では Fair Value。', memo: 'Historical = 検証可能性、Fair Value = 関連性' }),
    n('f_assumptions', '仮定 (Assumptions)', { color: '#3b82f6', summary: '4つの基本仮定。' }, [
      n('f_monetary', 'Monetary Unit', { color: '#3b82f6', detail: '取引は通貨単位で表現できるもののみ記録。従業員の士気など金銭換算できないものは含めない。J-BOX はユーロ建て。' }),
      n('f_entity', 'Economic Entity', { color: '#3b82f6', detail: '事業体の活動を所有者個人と分離して記録。Lucas の私的支出は J-BOX の帳簿に入れない。' }),
      n('f_going', 'Going Concern', { color: '#3b82f6', detail: '事業継続を前提。倒産前提なら Fair Value 評価が必要になる。Historical Cost の根拠。' }),
      n('f_periodicity', 'Periodicity (Time Period)', { color: '#3b82f6', detail: '事業活動を一定期間 (月/四半期/年) で区切る。J-BOX は12月決算。', memo: '期間区切りがあるから「期末調整」が必要' }),
    ]),
    n('f_qual', '質的特性', { color: '#3b82f6', summary: '情報の有用性の基準。' }, [
      n('f_fundamental', 'Fundamental: Relevance & Faithful Rep.', { color: '#3b82f6', detail: 'Relevance=意思決定に関連 (Predictive + Confirmatory)。Faithful Representation=忠実な表現 (Complete + Neutral + Free from error)。' }),
      n('f_enhancing', 'Enhancing: 4つ', { color: '#3b82f6', detail: 'Comparability (比較可能性) / Verifiability (検証可能性) / Timeliness (適時性) / Understandability (理解可能性)。' }),
      n('f_constraint', 'Going Concern, Full Disclosure, Cost Constraint', { color: '#3b82f6', detail: 'Full Disclosure=注記で全情報開示。Cost Constraint=情報提供コスト < 便益 でなければならない。' }),
    ]),
    n('f_ethics', '倫理 (Ethics) & Transparency', { color: '#3b82f6', detail: '会計の信頼性の基盤。エンロン事件→SOX法→内部統制強化。' }),
  ]),
  n('f_equation', '🧮 会計方程式 A = L + E', { color: '#3b82f6', detail: '会計の中核。すべての取引はこの式を維持する。J-BOX: 現金€15k + 売掛€8k + 在庫€22k = €45k Assets / 買掛€12k + 借入€8k = €20k Liab / Equity €25k → 45 = 20 + 25 ✓', memo: 'A = L + OE (Assets = Liabilities + Owner\'s Equity)', formula: 'Assets = Liabilities + Equity\nEquity = Share Capital + Retained Earnings\nRE = Beg RE + Net Income − Dividends\nNet Income = Revenue − Expenses' }, [
    n('f_assets', 'Assets (将来便益)', { color: '#3b82f6', detail: 'Cash, AR, Inventory, PPE, Intangibles など。1年以内=Current、それ以外=Non-Current。' }),
    n('f_liabilities', 'Liabilities (将来義務)', { color: '#3b82f6', detail: 'AP, Notes Payable, Bonds, Unearned Revenue など。Current vs Non-Current。' }),
    n('f_equity_root', 'Equity (残余請求権)', { color: '#3b82f6', detail: 'Share Capital + Retained Earnings + AOCI − Treasury。Revenue↑Equity、Expense↓Equity、Dividend↓Equity。' }),
  ]),
  n('f_stmts', '📊 4つの財務諸表', { color: '#3b82f6', summary: '作成順序: IS → RE → SFP → CFS', formula: '① IS: Revenue − Expenses = Net Income\n② RE Stmt: Beg RE + NI − Div = End RE\n③ SFP: Assets = Liab + Equity (RE含む)\n④ CFS: ΔCash = Op + Inv + Fin' }, [
    n('f_is', 'Income Statement', { color: '#3b82f6', detail: '一定期間の業績。Revenue − Expenses = Net Income。Multi-Step なら Gross Profit / Operating Income を分けて表示。' }),
    n('f_re', 'Retained Earnings Stmt', { color: '#3b82f6', detail: '期首RE + Net Income − Dividends = 期末RE。IS と SFP を繋ぐ。' }),
    n('f_sfp', 'SFP (Balance Sheet)', { color: '#3b82f6', detail: '一時点の財政状態。A = L + E。Classified (Current/Non-Current) で表示。' }),
    n('f_cfs_root', 'CFS (Statement of Cash Flows)', { color: '#3b82f6', detail: '一定期間の現金増減。Operating + Investing + Financing = ΔCash。' }),
  ]),
  n('f_biz', '💼 事業形態', { color: '#3b82f6' }, [
    n('f_prop', 'Proprietorship', { color: '#3b82f6', detail: '個人事業。所有者=事業の責任無限。設立簡単、税は個人。' }),
    n('f_partner', 'Partnership', { color: '#3b82f6', detail: '2人以上の共同事業。一般的に無限責任。' }),
    n('f_corp', 'Corporation', { color: '#3b82f6', detail: '法人格あり。Limited Liability。Share holders が所有。J-BOX BV はこれ。', memo: 'BV = Besloten Vennootschap (Dutch private corp)' }),
  ]),
]),

// ==================== 2. 記録サイクル ====================
n('cycle', '🔄 2. 記録サイクル (9 Steps)', { color: '#a855f7', ch: 2, summary: '取引→仕訳→転記→試算表→調整→諸表→締切 の流れ。' }, [
  n('cy_s1', 'Step 1. 取引分析 (Transaction Analysis)', { color: '#a855f7', detail: '各取引が A/L/E のどれをどう変えるか分析。Dual Effect: 必ず2つ以上の勘定が動く。', memo: '借方合計 = 貸方合計（必ず）' }),
  n('cy_s2', 'Step 2. 仕訳 (Journalize)', { color: '#a855f7', summary: 'Debit/Credit ルール適用。' }, [
    n('cy_dr_cr', 'Debit / Credit ルール', { color: '#a855f7', detail: '左 = Debit / 右 = Credit。各勘定タイプに「通常残高」がある。', formula: 'DEA Dr (通常借方残高):\n  Dividends, Expenses, Assets\nCLER Cr (通常貸方残高):\n  Capital(Equity), Liabilities, Revenue', memo: 'DEA Dr / CLER Cr' }),
    n('cy_normal', '通常残高 (Normal Balance)', { color: '#a855f7', detail: '増やす側が通常残高。Assets↑=Dr、Liab↑=Cr、Equity↑=Cr。' }),
    n('cy_compound', 'Compound Entry', { color: '#a855f7', detail: '3つ以上の勘定を含む仕訳。例: PPE取得を一部現金、一部借入。' }),
  ]),
  n('cy_s3', 'Step 3. 元帳転記 (Post to Ledger)', { color: '#a855f7', detail: 'T-account へ転記。Chart of Accounts に基づき各勘定に集計。', memo: 'Journal=時系列、Ledger=勘定別' }, [
    n('cy_chart', 'Chart of Accounts', { color: '#a855f7', detail: '勘定科目体系。番号付き。1xxx=Assets, 2xxx=Liab, 3xxx=Equity, 4xxx=Rev, 5xxx=Exp が一般的。' }),
  ]),
  n('cy_s4', 'Step 4. 試算表 (Trial Balance)', { color: '#a855f7', detail: '全勘定の残高一覧。Dr合計 = Cr合計 を確認。', memo: '【限界】次のミスは検出不可: ①取引そのものを記録漏れ ②同額をDr/Cr両方とも誤勘定 ③借方貸方を逆に同額計上 ④Compound Entry内の振替誤り' }),
  n('cy_s5', 'Step 5. 調整仕訳 (Adjusting Entries)', { color: '#a855f7', summary: '発生主義のための期末調整。4タイプ + Depreciation。', detail: '期末に「現金は動いていないが、収益/費用が発生済 or 未発生」を調整。', memo: '4タイプ: Prepaid Exp / Unearned Rev / Accrued Rev / Accrued Exp' }, [
    n('cy_deferral', 'Deferrals (繰延)', { color: '#a855f7', summary: '現金先行、認識後。' }, [
      n('cy_prepaid', 'Prepaid Expense', { color: '#a855f7', detail: '現金支払い済 → 期末に費用化。Dr Expense / Cr Prepaid Asset。例: 1年分保険料を期首に€1,200支払、3ヶ月経過→€300を費用化。', formula: 'Adj: Dr Insurance Exp 300 / Cr Prepaid Ins 300' }),
      n('cy_unearned', 'Unearned Revenue', { color: '#a855f7', detail: '現金受領済 → 期末に収益化。Dr Unearned Rev (Liab) / Cr Revenue。例: 顧客から前受け€600、半分役務提供済→€300収益化。' }),
    ]),
    n('cy_accrual', 'Accruals (発生)', { color: '#a855f7', summary: '認識先行、現金後。' }, [
      n('cy_acc_rev', 'Accrued Revenue', { color: '#a855f7', detail: '収益発生済 / 未請求未収。Dr AR / Cr Revenue。' }),
      n('cy_acc_exp', 'Accrued Expense', { color: '#a855f7', detail: '費用発生済 / 未払。Dr Expense / Cr Payable。例: 給与€500未払。Dr Salaries Exp 500 / Cr Salaries Payable 500。' }),
    ]),
    n('cy_depreciation', 'Depreciation (減価償却)', { color: '#a855f7', detail: '長期資産のコスト配分。Dr Depreciation Exp / Cr Accumulated Depreciation (Contra-Asset)。', formula: 'Straight-Line: (Cost − Salvage) / Useful Life' }),
  ]),
  n('cy_s6', 'Step 6. 調整後試算表 (Adjusted TB)', { color: '#a855f7', detail: '調整仕訳反映後。財務諸表作成のソース。' }),
  n('cy_s7', 'Step 7. 財務諸表作成', { color: '#a855f7', detail: 'Adjusted TB → IS → RE Stmt → SFP の順で作成。' }, [
    n('cy_worksheet', '10列ワークシート (Worksheet)', { color: '#a855f7', detail: 'TB → Adjustments → Adj TB → IS → SFP の5ペア10列。Net Income は IS 欄の差額として計算し、SFP 欄の Equity に転記。' }),
  ]),
  n('cy_s8', 'Step 8. 締切仕訳 (Closing Entries)', { color: '#a855f7', summary: '一時勘定を RE へ振替。', detail: 'Temporary 勘定 (Rev, Exp, Div) を Income Summary 経由で RE に振替。', memo: '4ステップ: ①Rev → IncomeSum / ②IncomeSum → Exp / ③IncomeSum→RE / ④Div→RE' }, [
    n('cy_temp', 'Temporary 勘定', { color: '#a855f7', detail: 'Revenue / Expense / Dividends。期末にゼロにする。' }),
    n('cy_perm', 'Permanent 勘定', { color: '#a855f7', detail: 'Assets / Liab / Equity (RE)。締切なし、翌期へ繰越。' }),
  ]),
  n('cy_s9', 'Step 9. 締切後試算表 (Post-Closing TB)', { color: '#a855f7', detail: 'Permanent 勘定のみ。翌期の期首残高となる。' }),
  n('cy_optional', 'Optional', { color: '#a855f7' }, [
    n('cy_reversing', 'Reversing Entries', { color: '#a855f7', detail: '期首に前期Accrual調整を逆仕訳。任意。Bookkeeping簡素化目的。' }),
    n('cy_correcting', 'Correcting Entries', { color: '#a855f7', detail: '誤記録の訂正。Adjusting と異なり「いつでも」発生。' }),
  ]),
]),

// ==================== 3. 認識原則 ====================
n('recognition', '🎯 3. 認識原則', { color: '#a855f7', ch: 3, summary: '「いつ」記録するかのルール。' }, [
  n('r_accrual', '発生主義 vs 現金主義', { color: '#a855f7', detail: '発生主義 (Accrual): 経済事象発生時に記録。IFRS/GAAP標準。\n現金主義 (Cash): 現金移動時のみ。小規模事業のみ可。', memo: 'IFRS = 発生主義必須' }),
  n('r_rev_recog', '収益認識 5ステップ (IFRS 15)', { color: '#a855f7', detail: '①契約識別 ②履行義務識別 ③取引価格決定 ④価格配分 ⑤履行義務充足時に認識', formula: '5-Step:\n① Identify contract\n② Identify performance obligations\n③ Determine transaction price\n④ Allocate price\n⑤ Recognize as obligations satisfied' }),
  n('r_matching', 'Matching Principle (費用認識)', { color: '#a855f7', detail: '費用は関連する収益と同じ期間に認識。COGS は売上と同期間。減価償却は使用期間に配分。' }),
  n('r_period', 'Time Period 仮定', { color: '#a855f7', detail: '期間を区切るからこそ「期末調整」が必要になる。' }),
]),

// ==================== 4. 商品売買 (Merchandising) ====================
n('merch', '🏪 4. 商品売買 (Ch5)', { color: '#ec4899', ch: 5, summary: 'J-BOX BV はビンテージウェア小売商。商品売買が本業。' }, [
  n('m_vs_service', 'Service vs Merchandising', { color: '#ec4899', detail: 'Service: Revenue − Op Exp = NI。\nMerchandising: Sales − COGS = Gross Profit、− Op Exp = Op Income。', memo: 'Merchandiser には COGS が登場' }),
  n('m_cogs_formula', 'COGS 計算式', { color: '#ec4899', detail: 'Cost of Goods Sold = 期首在庫 + 仕入 − 期末在庫。Perpetual では取引ごとに記録、Periodic では期末に計算。', formula: 'COGS = Beg Inv + Net Purchases − End Inv\nGoods Available for Sale = Beg Inv + Net Purchases', memo: '在庫計算式: Beg + Purch − End = COGS' }),
  n('m_purchase', '仕入処理 (Perpetual)', { color: '#ec4899', detail: 'Dr Inventory / Cr AP (or Cash)。返品/値引/割引は Inventory を直接調整。' }, [
    n('m_fob', 'FOB Shipping Point / Destination', { color: '#ec4899', detail: 'FOB Shipping Point: 出荷時に所有権移転、買い手が運賃負担 (Dr Inventory)。\nFOB Destination: 到着時に所有権移転、売り手が運賃負担 (Dr Freight-out Exp)。', memo: 'Shipping Point=買い手負担(=Inv加算)、Destination=売り手負担(=Op Exp)' }),
    n('m_pur_returns', 'Purchase Returns/Allowances', { color: '#ec4899', detail: 'Dr AP / Cr Inventory。仕入を取り消す。' }),
    n('m_pur_disc', 'Purchase Discount (2/10, n/30)', { color: '#ec4899', detail: '10日以内支払で2%割引、それ以外30日以内に全額。Dr AP €1,000 / Cr Cash €980 / Cr Inventory €20。', formula: '2/10, n/30 → 10日以内2%引、最長30日' }),
  ]),
  n('m_sales', '売上処理 (2仕訳)', { color: '#ec4899', detail: 'Perpetual では1取引で2仕訳必要。\n① Dr Cash/AR / Cr Sales Revenue\n② Dr COGS / Cr Inventory', formula: '【売上1取引で2仕訳】\n① Cash/AR ←→ Sales\n② COGS ←→ Inventory' }, [
    n('m_sales_returns', 'Sales Returns/Allowances', { color: '#ec4899', detail: 'Dr Sales Returns (Contra-Rev) / Cr AR\nDr Inventory / Cr COGS (Perpetual)。' }),
    n('m_sales_disc', 'Sales Discount', { color: '#ec4899', detail: 'Dr Cash / Dr Sales Discount (Contra-Rev) / Cr AR。' }),
  ]),
  n('m_contra', 'Contra 勘定 (全タイプ)', { color: '#ec4899', detail: 'ある勘定とペアで「マイナス」を表す勘定。Net額を表示するため。', memo: 'Contra-Asset: Accum Dep, Allowance for Doubtful Accounts\nContra-Rev: Sales Returns, Sales Discount\nContra-Equity: Treasury Shares' }),
  n('m_multistep', 'Multi-Step IS', { color: '#ec4899', detail: 'Sales − COGS = Gross Profit → − Op Exp = Op Income → ± Non-op = NI Before Tax。', formula: 'Sales\n− Sales Returns/Disc\n= Net Sales\n− COGS\n= Gross Profit\n− Operating Expenses\n= Operating Income\n± Non-Op Items\n= NI Before Tax' }),
  n('m_periodic_app', '[Appendix 5B] Periodic System', { color: '#ec4899', appendix: true, detail: '期末まで在庫/COGS を更新しない。Purchases勘定を使う。期末にCOGS = Beg + Pur − End で計算。' }),
]),

// ==================== 5. 現金 & 内部統制 ====================
n('cash', '💵 5. 現金 & 内部統制 (Ch7)', { color: '#10b981', ch: 7, summary: '最も流動性高い資産。不正リスクが高いため厳格管理。' }, [
  n('ca_def', 'Cash & Cash Equivalents 定義', { color: '#10b981', detail: 'Cash: 現金、銀行預金、即時換金可能。\nCash Equivalents: 取得日から3ヶ月以内に満期の流動性高い投資 (国債、CP)。', memo: '取得日から3ヶ月以内=CE' }),
  n('ca_ic', '内部統制 (Internal Control)', { color: '#10b981', summary: '5原則 + Fraud Triangle' }, [
    n('ca_fraud', 'Fraud Triangle 3要素', { color: '#10b981', detail: '①Opportunity (機会) ②Pressure (動機) ③Rationalization (正当化)。3つ揃うと不正発生確率が高まる。', memo: '3つ揃う→不正発生' }),
    n('ca_5principle', 'IC 5原則', { color: '#10b981', detail: '①Establish Responsibility (責任の明確化)\n②Segregation of Duties (職務分離)\n③Documentation Procedures (証憑書類)\n④Physical/Electronic Controls (物理電子的管理)\n⑤Independent Internal Verification (独立検証)\n+ Human Resource Controls (人事管理)' }),
    n('ca_sox', 'SOX法 (Sarbanes-Oxley)', { color: '#10b981', detail: '2002年米国法。Enron事件への対応。経営者によるICの有効性証明、外部監査人による検証。' }),
  ]),
  n('ca_petty', 'Petty Cash (小口現金)', { color: '#10b981', detail: 'Imprest System。一定額を設定 (例:€100)。使用時は領収書を保管、補充時に費用計上。', memo: 'Imprest=定額前渡。補充時にだけ費用認識' }),
  n('ca_bank_rec', 'Bank Reconciliation', { color: '#10b981', detail: '帳簿残高と銀行残高を一致させる作業。', formula: '【銀行側調整】\n+ Deposit in Transit (未達預入)\n− Outstanding Checks (未払小切手)\n± Bank Error\n=Adjusted Bank Bal\n\n【帳簿側調整】\n+ Note Collected (代金回収)\n+ Interest Earned\n− NSF Check (不渡)\n− Bank Service Charge\n± Book Error\n=Adjusted Book Bal\n\n両者一致が目標', memo: '帳簿側調整項目は仕訳が必要、銀行側は不要' }),
  n('ca_mgmt', '現金管理原則', { color: '#10b981', detail: '①Surprise Counts ②Bonding Employees ③Vacation Required ④Background Checks ⑤Segregation of Cash Handling vs Recordkeeping' }),
]),

// ==================== 6. 売掛金 ====================
n('ar', '📒 6. 売掛金 (Receivables) (Ch8)', { color: '#10b981', ch: 8, summary: 'AR・Notes Receivable・貸倒・処分' }, [
  n('ar_types', 'Receivable タイプ', { color: '#10b981', detail: 'Accounts Receivable: 一般顧客への売掛、通常30〜60日。\nNotes Receivable: 約束手形、書面契約、利息あり。\nOther Receivables: 従業員貸付、利息債権、税金還付など。' }),
  n('ar_allowance', '貸倒見積 (Allowance Method)', { color: '#10b981', detail: 'IFRS必須。期末に Bad Debt Exp と Allowance for Doubtful Accounts (Contra-Asset) を計上。', memo: 'Direct Write-off 法は不可 (Matching違反)', formula: '計上: Dr Bad Debt Exp / Cr Allowance for DA\n貸倒確定: Dr Allowance / Cr AR\n回収: Dr AR / Cr Allowance、その後 Dr Cash / Cr AR' }, [
    n('ar_pct_sales', '% of Sales 法', { color: '#10b981', detail: 'IS Approach。当期売上 × 推定貸倒率 = Bad Debt Exp。既存 Allowance 残高を無視。', formula: 'Bad Debt Exp = Net Credit Sales × %' }),
    n('ar_aging', 'Aging (% of Receivables) 法', { color: '#10b981', detail: 'SFP Approach。期末AR を経過月数で分類、各層に貸倒率適用。期末あるべきAllowance残高を計算→既存残高との差額がBad Debt Exp。', formula: '必要Allowance − 現Allowance = Bad Debt Exp' }),
  ]),
  n('ar_notes', 'Notes Receivable', { color: '#10b981', detail: '計算: 元本 × 年利 × 期間。Honor=正常満期。Dishonor=不渡。', formula: 'Interest = Principal × Rate × Time\n例: €10,000 × 6% × 90/360 = €150' }),
  n('ar_disposal', 'AR 処分 (早期現金化)', { color: '#10b981', detail: 'Sale of Receivables=売却。\nFactoring=Factor会社へ売却。\nCredit Card=カード会社が即時支払 (手数料あり)。' }),
]),

// ==================== 7. 在庫 (Inventory) ====================
n('inv', '📦 7. 在庫 (Ch6)', { color: '#10b981', ch: 6, summary: 'タイプ・所有権・コストフロー・評価' }, [
  n('iv_types', '在庫タイプ', { color: '#10b981', detail: '小売: Merchandise Inventory (1種類)。\n製造: Raw Materials / Work-in-Process / Finished Goods (3種類)。', memo: '小売=1種、製造=3種' }),
  n('iv_ownership', '所有権判定', { color: '#10b981', detail: 'FOB Shipping Point: 出荷時に買い手所有。\nFOB Destination: 到着時に買い手所有。\nConsigned Goods: 委託品は委託者(Consignor)の在庫。受託者(Consignee)は計上しない。', memo: '期末カウント時に必ず確認' }),
  n('iv_costflow', 'コストフロー方法', { color: '#10b981', summary: '4方法 (IFRS は LIFO 不可)' }, [
    n('iv_specific', 'Specific Identification', { color: '#10b981', detail: '個別商品ごとに実コスト追跡。高額品 (車、宝石、美術品)向け。J-BOX のヴィンテージは Specific ID 可。' }),
    n('iv_fifo', 'FIFO (First-In, First-Out)', { color: '#10b981', detail: '先入先出。古い在庫から払出。インフレ時: COGS低、NI高、期末在庫は最新コスト=高。', memo: 'インフレ→FIFOはNI高、税高' }),
    n('iv_avg', 'Weighted Average', { color: '#10b981', detail: '加重平均単価で払出。Perpetual では取引のたびに再計算 (Moving Average)。', formula: 'Avg Cost = Cost of Goods Available / Units Available' }),
    n('iv_lifo', 'LIFO (US OK / IFRS不可) [Appendix 6C]', { color: '#10b981', appendix: true, detail: '後入先出。新しい在庫から払出。インフレ時: COGS高、NI低、税低 (米国節税戦略)。IFRSでは禁止。', memo: 'IFRS禁止、US GAAP可' }),
  ]),
  n('iv_system', '在庫システム', { color: '#10b981' }, [
    n('iv_perpetual', 'Perpetual System', { color: '#10b981', detail: '取引のつど Inventory と COGS を更新。POSシステムで自動化。J-BOXは Perpetual。' }),
    n('iv_periodic', 'Periodic System [Appendix 5B]', { color: '#10b981', appendix: true, detail: '期末まで更新せず、Purchases勘定で蓄積。期末に物理実査でCOGS計算。' }),
  ]),
  n('iv_lcnrv', 'LCNRV (Lower-of-Cost-or-NRV)', { color: '#10b981', detail: '取得原価とNet Realizable Valueの低い方で評価。価値下落時はWrite-down。\nNRV = 見積売価 − 見積完成費用 − 見積販売費。', memo: '保守主義の原則' }),
  n('iv_errors', '在庫誤謬の影響', { color: '#10b981', detail: '期末在庫過大 → COGS過小 → NI過大 (当期)。翌期は逆向き (Beg Inv過大→COGS過大→NI過小)。2年合計でNIは正確 (Self-correcting)。', memo: '当期と翌期で逆向き、2年合計で相殺' }),
  n('iv_estimate', '推定法 [Appendix 6B]', { color: '#10b981', appendix: true, detail: 'Gross Profit法: 過去のGP率から期末在庫推定。\nRetail法: 売価と原価の比率から推定。' }),
  n('iv_turnover', 'Inventory Turnover & Days', { color: '#10b981', detail: '在庫回転率。高すぎ=品切れリスク、低すぎ=滞留・陳腐化。', formula: 'Inventory Turnover = COGS / Avg Inventory\nDays in Inventory = 365 / Turnover' }),
  n('iv_gas', 'Cost of Goods Available for Sale', { color: '#10b981', detail: '期首在庫 + 当期仕入。COGS と期末在庫に振り分けられる総額。', formula: 'GAS = Beg Inv + Net Purchases\nGAS = COGS + End Inv' }),
  n('iv_jit', 'JIT (Just-in-Time)', { color: '#10b981', detail: '必要なものを必要な量だけ。在庫保有コスト最小化。Toyota流。サプライチェーンの綿密な調整必要。' }),
]),

// ==================== 8. 非流動資産 (Plant Assets) ====================
n('ppe', '🏭 8. 非流動資産 (Ch9)', { color: '#10b981', ch: 9, summary: 'PPE・天然資源・無形' }, [
  n('p_plant', 'Plant Assets (PPE)', { color: '#10b981', summary: '長期使用・物理的実在' }, [
    n('p_capitalize', '取得原価 (Capitalization)', { color: '#10b981', detail: '「使用可能状態にするまでの全費用」を資産計上。', formula: '【Land】Purchase Price + Closing Costs + Demolition Cost − Salvage from demolition + Surveys + Filling/Grading\n\n【Buildings】Price + Closing + Renovation必要費\n\n【Equipment】Price + Sales Tax + Freight + Installation + Test Run' }, [
      n('p_land', 'Land (整地・撤去含む)', { color: '#10b981', detail: '購入価格 + 仲介手数料 + 整地費 + 古建物撤去費 − 撤去資材売却。土地は減価償却しない。' }),
      n('p_buildings', 'Buildings & Equipment', { color: '#10b981', detail: '購入価格 + 各種準備費 + 試運転費。Equipmentは保険料(運搬中)も含む。' }),
      n('p_revenue_capital', '修繕 vs 改良 (Revenue vs Capital Exp)', { color: '#10b981', detail: 'Revenue Expenditure: 通常修繕 → 即費用化。\nCapital Expenditure: 大規模改良 (耐用年数延長、能力向上) → 資産化して減価償却。', memo: '小=費用、大=資産' }),
    ]),
    n('p_dep', '減価償却 3方法', { color: '#10b981', summary: 'SL / UA / DDB の計算法', formula: 'Depreciable Cost = Cost − Salvage Value' }, [
      n('p_sl', 'Straight-Line', { color: '#10b981', detail: '均等償却。最も一般的。', formula: 'Annual Dep = (Cost − Salvage) / Useful Life' }),
      n('p_ua', 'Units-of-Activity', { color: '#10b981', detail: '使用量比例。トラックの走行距離など。', formula: 'Dep per Unit = (Cost − Salvage) / Total Units\nAnnual Dep = Actual Units × Dep per Unit' }),
      n('p_ddb', 'Declining-Balance', { color: '#10b981', detail: '加速償却。早期に多く費用化。Salvageは初年計算では使わない。', formula: 'Annual Dep = Book Value × (1/Life × 2)\n(Double-Declining-Balance の場合)' }),
    ]),
    n('p_revaluation', 'Revaluation Model (IFRS)', { color: '#10b981', detail: 'Fair Value評価可。Gain → Revaluation Surplus (Equity / OCI、NIには通らない)。Loss → Impairment (IS)。', memo: 'Gain→OCI、Loss→IS。非対称', formula: 'Gain: Dr PPE / Cr Rev Surplus (Equity)\nLoss: Dr Impairment Loss / Cr PPE' }),
    n('p_disposal', '処分 (Disposal)', { color: '#10b981', detail: 'Sale: 売却額 vs 帳簿価額の差をGain/Loss計上。\nRetirement: 廃棄。BV残高をLoss計上。\nExchange [Appendix 9A]: 交換取引。', formula: 'Gain/Loss = Cash Received − Book Value\n(BV = Cost − Accum Dep)' }),
    n('p_analysis', '分析指標', { color: '#10b981' }, [
      n('p_at', 'Asset Turnover', { color: '#10b981', formula: 'Asset Turnover = Net Sales / Avg Total Assets', detail: '1ユーロの資産でいくら売上を生むか。' }),
      n('p_roa', 'Return on Assets', { color: '#10b981', formula: 'ROA = NI / Avg Total Assets\n   = Profit Margin × Asset Turnover (DuPont)' }),
    ]),
  ]),
  n('p_nat', '天然資源 (Natural Resources)', { color: '#10b981', detail: '鉱山・油田など。Depletion (減耗償却) で費用化。Units-of-Activity 類似。Accumulated Depletion がContra-Asset。' }),
  n('p_intangible', '無形資産', { color: '#10b981', summary: '物理的実体なし・長期便益' }, [
    n('p_intan_limited', '有限耐用 (償却対象)', { color: '#10b981', detail: 'Patent (20年)、Copyright、License、Franchiseなど。Straight-Lineで償却 (Amortization Exp / Accum Amortization)。' }),
    n('p_intan_indef', '無期限耐用 (償却なし)', { color: '#10b981', detail: 'Goodwill、Trademarkなど。償却せず、毎年Impairment Testを行う。Goodwill=買収プレミアム、自社で創出したものは計上不可。' }),
    n('p_rd', 'R&D (即費用化)', { color: '#10b981', detail: 'Research 段階は全額費用化 (IS)。\nDevelopment 段階は条件満たせばIFRSで資産化可 (US GAAP は全費用化)。', memo: 'IFRS: R=費用、D=条件付き資産化' }),
  ]),
]),

// ==================== 9. 負債 ====================
n('liab', '⚖️ 9. 負債 (Liabilities)', { color: '#f59e0b', ch: 10, summary: '流動 (Ch10) + 非流動 (Ch11)' }, [
  n('l_current', '流動負債 (Ch10)', { color: '#f59e0b', summary: '1年以内' }, [
    n('l_cl_5cat', '5 カテゴリ', { color: '#f59e0b', detail: '①AP (買掛金) ②Notes Payable (短期手形) ③Accrued Liab (給与・利息・税未払) ④Current portion of LT Debt ⑤Unearned Revenue (前受) + Provisions' }),
    n('l_st_notes', 'Short-term Notes Payable', { color: '#f59e0b', detail: '4 仕訳パターン: ①借入 ②期末利息調整 ③利払 ④元本返済。', formula: '借入: Dr Cash / Cr Notes Payable\n期末: Dr Interest Exp / Cr Interest Payable\n利払: Dr Interest Payable / Cr Cash\n返済: Dr Notes Payable / Cr Cash' }),
    n('l_vat', 'VAT (Value-Added Tax)', { color: '#f59e0b', detail: '消費税。販売時に預かり、納付までVAT Payable。仕入時のVATは控除 (VAT Receivable)。差額を税務当局へ。' }),
    n('l_provisions', 'Provisions', { color: '#f59e0b', detail: '不確実な負債 (時期/金額)。条件: 過去事象・現在義務・流出可能性高い・金額信頼性高い。例: Warranty (製品保証)。', memo: 'Warranty Exp計上→当年売上に対応 (Matching)', formula: '計上: Dr Warranty Exp / Cr Warranty Liab\n実行: Dr Warranty Liab / Cr Cash/Inv' }),
  ]),
  n('l_noncurrent', '非流動負債 (Ch11)', { color: '#f59e0b', summary: '1年超' }, [
    n('l_bonds_basics', 'Bonds 基礎 (Face/Discount/Premium)', { color: '#f59e0b', detail: '社債。長期借入。\nFace Value発行: Market Rate = Stated Rate (額面)。\nDiscount発行: Market > Stated (額面割れ)。\nPremium発行: Market < Stated (額面超)。', memo: '【覚え方】Market高→投資家魅力なし→額面割れ (Discount)' }),
    n('l_bonds_journal', 'Bonds 仕訳 (発行・利息・償還)', { color: '#f59e0b', detail: '発行: Dr Cash / Cr Bonds Payable (Face).\n利払: Dr Interest Exp / Cr Cash.\n償還 (Maturity): Dr Bonds Payable / Cr Cash.\n償還 (Before Maturity): BV vs 買戻価格→Gain/Loss。' }),
    n('l_lt_notes', 'Long-term Notes Payable', { color: '#f59e0b', detail: '長期手形。利息と元本を分けて支払 (Installment)。' }),
    n('l_mortgage', 'Mortgage (抵当借入)', { color: '#f59e0b', detail: '不動産担保。元利均等返済。当初は利息多、後半は元本多。' }),
    n('l_bond_appendix', '[Appendix 11A/11B] 償却法', { color: '#f59e0b', appendix: true, examNG: true, detail: '⚠️ 試験範囲外。\n11A: Effective Interest (IFRS必須) - BV × Market Rate。\n11B: Straight-Line - D/P ÷ 期間 で均等償却。' }),
  ]),
]),

// ==================== 10. 株主資本 ====================
n('eq', '🪙 10. 株主資本 (Ch12)', { color: '#f59e0b', ch: 12, summary: 'Contributed + Earned' }, [
  n('eq_6', '6 構成要素', { color: '#f59e0b', detail: 'Equity = SC-Ord + SC-Pref + Share Premium + RE + AOCI − Treasury Shares', formula: 'Equity = SC + SP + RE + AOCI − Treasury' }, [
    n('eq_sc_ord', 'Share Capital - Ordinary', { color: '#f59e0b', detail: '普通株式。Par Value (額面) × 発行株数。議決権あり。' }),
    n('eq_sc_pref', 'Share Capital - Preference', { color: '#f59e0b', detail: '優先株式。Dividend優先、清算時優先。通常議決権なし。' }),
    n('eq_sp', 'Share Premium', { color: '#f59e0b', detail: '発行価格 − Par Value。Equity であって Income ではない。' }),
    n('eq_re', 'Retained Earnings', { color: '#f59e0b', detail: '累積純利益 − 累積配当。Earned Capital の中心。', formula: 'End RE = Beg RE + NI − Div' }),
    n('eq_aoci', 'Accumulated OCI', { color: '#f59e0b', detail: 'OCI項目の累積。Revaluation Surplus、為替換算差額、FVOCI証券評価差額など。' }),
    n('eq_treasury', 'Treasury Shares (Contra-Equity)', { color: '#f59e0b', detail: '自社株。Equity のマイナス項目 (資産ではない)。' }),
  ]),
  n('eq_contrib_earn', 'Contributed vs Earned Capital', { color: '#f59e0b', detail: 'Contributed = SC + Share Premium (株主拠出)。\nEarned = Retained Earnings (事業で稼いだ)。' }),
  n('eq_issuance', '株式発行', { color: '#f59e0b' }, [
    n('eq_par', 'Par/Above Par', { color: '#f59e0b', detail: '€1 Par、€5発行: Dr Cash 5 / Cr SC-Ord 1 / Cr Share Premium 4。Premium はEquityであってIncomeではない。' }),
    n('eq_noncash', '非現金発行 (Fair Value)', { color: '#f59e0b', detail: '株式と引換に資産受領。受領資産のFair Value (より明確な方) で記録。' }),
  ]),
  n('eq_pref', 'Preference Shares 詳細', { color: '#f59e0b' }, [
    n('eq_cumul', 'Cumulative', { color: '#f59e0b', detail: '前年未払配当 (Dividends in Arrears) を翌年に繰越。普通株配当より優先。' }),
    n('eq_conv', 'Convertible', { color: '#f59e0b', detail: '普通株への転換権あり。Equity 内振替。' }),
  ]),
  n('eq_treas_ops', 'Treasury Shares 取引', { color: '#f59e0b' }, [
    n('eq_buy', '取得 (Buyback)', { color: '#f59e0b', detail: 'Dr Treasury Shares / Cr Cash (Cost法)。' }),
    n('eq_resell', '再売却', { color: '#f59e0b', detail: '取得価格より高く売れた差額 → Share Premium-Treasury (Equity)。Gain/Loss を IS に出さない。', memo: 'Treasury再売差額はSP-Treasury、ISには出ない' }),
  ]),
  n('eq_div', '配当 (Dividends)', { color: '#f59e0b' }, [
    n('eq_cash_div', 'Cash Dividend', { color: '#f59e0b', detail: '3つの日付: Declaration (宣言日)・Record (基準日)・Payment (支払日)。', formula: 'Declaration: Dr RE / Cr Dividends Payable\nRecord: 仕訳なし\nPayment: Dr Div Payable / Cr Cash', memo: 'Cash Div → Total Equity ↓' }),
    n('eq_share_div', 'Share (Stock) Dividend', { color: '#f59e0b', detail: '株式で配当。RE → SC + Share Premium へ振替。Total Equity 不変。普通株数は増える。', formula: 'Dr RE / Cr SC-Ord / Cr Share Premium', memo: 'Total Equity不変、株数増' }),
    n('eq_split', 'Stock Split', { color: '#f59e0b', detail: '分割。1株→2株など。仕訳なし (Par Value のみ減少)。', memo: '仕訳なし。Par Value減・株数増' }),
  ]),
  n('eq_soce', '[Appendix 12A 試験範囲] SOCE', { color: '#f59e0b', appendix: true, examOK: true, detail: '✅ 授業で扱った範囲 → 試験範囲。\nStatement of Changes in Equity。期首 → NI + OCI + 株式取引 − 配当 → 期末。IFRS必須報告書。', formula: 'SOCE = 期首 + NI + OCI + 株式取引 − 配当 = 期末' }),
]),

// ==================== 11. CFS ====================
n('cfs', '💸 11. キャッシュフロー計算書 (Ch14)', { color: '#06b6d4', ch: 14, summary: '現金の動きを3区分で開示' }, [
  n('cfs_3sec', '3 セクション', { color: '#06b6d4', detail: 'Operating + Investing + Financing = ΔCash', memo: '配当支払=Financing、利息支払=Operating' }, [
    n('cfs_op', 'Operating', { color: '#06b6d4', detail: '本業のCF。売掛回収、買掛支払、給与、税、利息。IS + ΔCurrent Asset/Liab から導出。' }),
    n('cfs_inv', 'Investing', { color: '#06b6d4', detail: '長期投資。PPE売買、有価証券売買、貸付。Δ Non-current Assets から導出。' }),
    n('cfs_fin', 'Financing', { color: '#06b6d4', detail: '資金調達。株式発行、社債発行/償還、配当支払、自社株。Δ Non-current Liab + Equity。' }),
  ]),
  n('cfs_indirect', 'Indirect Method (主流90%+)', { color: '#06b6d4', detail: 'Net Income起点で調整。', formula: 'Net Income\n+ Depreciation/Amortization (非現金)\n− Gain on Sale (Inv/Finへ振替)\n+ Loss on Sale\n− ΔAR (増加なら)\n− ΔInventory (増加なら)\n+ ΔAP (増加なら)\n+ ΔAccrued Liab (増加なら)\n= Operating CF', memo: '【方向】Current Asset↑=減算、Current Liab↑=加算' }),
  n('cfs_direct', '[Appendix 14A 試験範囲] Direct Method', { color: '#06b6d4', appendix: true, examOK: true, detail: '✅ 授業で扱った範囲 → 試験範囲。\n営業CF項目を直接列挙。IFRS推奨だが実務少数。両方法でOperating CF同額。', formula: 'Cash from Customers = Sales − ΔAR\nCash to Suppliers = COGS + ΔInv − ΔAP\nCash to Employees = Salaries Exp − ΔSalaries Payable\nCash for Interest = Interest Exp − ΔInterest Payable' }),
  n('cfs_fcf', 'Free Cash Flow', { color: '#06b6d4', detail: '配当・成長投資に使える余裕度。', formula: 'FCF = Operating CF − Capital Expenditures', memo: 'FCF > Dividends = 持続可能' }),
]),

// ==================== 12. 財務分析 ====================
n('ana', '📈 12. 財務分析 (Ch15)', { color: '#06b6d4', ch: 15, summary: 'Horizontal / Vertical / Ratio' }, [
  n('an_horiz', 'Horizontal Analysis', { color: '#06b6d4', detail: '時系列比較。Base Year に対する%変化。', formula: '%Change = (Current − Base) / Base × 100' }),
  n('an_vert', 'Vertical Analysis', { color: '#06b6d4', detail: '構成比分析 (Common-Size)。IS は Sales=100%、SFP は Total Assets=100%。' }),
  n('an_prof', '収益性 Ratios', { color: '#06b6d4' }, [
    n('an_pm', 'Profit Margin', { color: '#06b6d4', formula: 'PM = NI / Net Sales' }),
    n('an_at2', 'Asset Turnover', { color: '#06b6d4', formula: 'AT = Net Sales / Avg Total Assets' }),
    n('an_roa2', 'ROA', { color: '#06b6d4', formula: 'ROA = NI / Avg Total Assets\n   = PM × AT (DuPont)' }),
    n('an_roe', 'ROE', { color: '#06b6d4', formula: 'ROE = NI / Avg Equity' }),
    n('an_eps', 'EPS', { color: '#06b6d4', formula: 'EPS = NI / Avg Common Shares Outstanding' }),
    n('an_dupont', 'DuPont (PM × AT = ROA)', { color: '#06b6d4', detail: '収益性を「Profit Margin (利幅)」と「Asset Turnover (回転)」に分解。', formula: 'ROA = (NI/Sales) × (Sales/Assets) = NI/Assets' }),
  ]),
  n('an_liq', '流動性 Ratios', { color: '#06b6d4' }, [
    n('an_curr', 'Current Ratio', { color: '#06b6d4', formula: 'Current Ratio = Current Assets / Current Liab\n目安: >1.5' }),
    n('an_quick', 'Acid-Test (Quick)', { color: '#06b6d4', formula: 'Quick = (Cash + ST Inv + AR) / Current Liab\n目安: >1.0', memo: 'Inventory除外' }),
  ]),
  n('an_solv', '支払能力 Ratios', { color: '#06b6d4' }, [
    n('an_debt_assets', 'Debt to Total Assets', { color: '#06b6d4', formula: 'D/A = Total Liab / Total Assets' }),
    n('an_debt_equity', 'Debt to Equity', { color: '#06b6d4', formula: 'D/E = Total Liab / Total Equity' }),
  ]),
  n('an_sustainable', 'Sustainable Income / Quality of Earnings', { color: '#06b6d4', detail: 'Sustainable Income = 継続事業の純利益。一過性項目 (Discontinued Op, 特別損益) 除外。\nQuality of Earnings = OCF / NI。1超 = 高品質。' }),
]),

]); // ← root.children 終了

// ==================== クロスリンク（概念間の繋がり） ====================
window.XLINKS.push(
  // 認識原則 ↔ 調整仕訳
  { from: 'r_accrual', to: 'cy_s5', label: '発生主義 → 調整必要' },
  { from: 'r_matching', to: 'cy_depreciation', label: 'Matching → 償却' },
  // 方程式 → 諸表
  { from: 'f_equation', to: 'f_sfp', label: 'A=L+E' },
  { from: 'f_is', to: 'f_re', label: 'NI →' },
  { from: 'f_re', to: 'f_sfp', label: 'End RE →' },
  // 商品売買 ↔ 在庫
  { from: 'm_cogs_formula', to: 'iv_gas', label: 'COGS式' },
  { from: 'm_sales', to: 'ar_types', label: '掛売→AR' },
  { from: 'm_purchase', to: 'iv_perpetual', label: 'Perpetual' },
  { from: 'm_fob', to: 'iv_ownership', label: '所有権' },
  { from: 'm_contra', to: 'ar_allowance', label: 'Contra-Asset' },
  { from: 'm_contra', to: 'p_dep', label: 'Accum Dep' },
  { from: 'm_contra', to: 'eq_treasury', label: 'Treasury' },
  // 売掛金 ↔ 認識
  { from: 'ar_allowance', to: 'r_matching', label: 'Matching' },
  { from: 'ar_allowance', to: 'cy_s5', label: '期末調整' },
  // PPE ↔ 調整
  { from: 'p_dep', to: 'cy_depreciation', label: '減価償却' },
  { from: 'p_dep', to: 'iv_costflow', label: '3方法選択' },
  // 負債 ↔ CFS
  { from: 'l_bonds_journal', to: 'cfs_op', label: '利息=Op' },
  { from: 'l_bonds_journal', to: 'cfs_fin', label: '元本=Fin' },
  // 配当 ↔ RE ↔ CFS
  { from: 'eq_cash_div', to: 'eq_re', label: 'RE減' },
  { from: 'eq_cash_div', to: 'cfs_fin', label: 'Fin section' },
  // IS → RE → SFP
  { from: 'm_multistep', to: 'f_is', label: 'IS構造' },
  { from: 'f_is', to: 'cfs_indirect', label: 'NI起点' },
  // SOCE
  { from: 'eq_soce', to: 'f_stmts', label: '5th statement' },
  // Ratios pull from all statements
  { from: 'an_prof', to: 'f_is', label: 'IS数値' },
  { from: 'an_liq', to: 'f_sfp', label: 'SFP数値' },
  { from: 'an_solv', to: 'f_sfp', label: 'SFP数値' },
);


// (initial xlinks removed - merged into push() above)
