# SCROLL TO ANCHOR

Là một plugin jquery nhỏ dùng để di chuyển tới vị trí đã chỉ định.

## CÁCH SỬ DỤNG / HOW TO USE

Thêm thuộc tính `data-goto-anchor` vào đối tượng cần trỏ tới vị trí cần đến.

Thuộc tính `data-goto-anchor` hỗ trợ 2 loại type: string (id/class) và number.

Thuộc tính `data-goto-diff` (tuỳ chọn) vào đối tượng để tăng/giảm khoảng cách khi trỏ đến.

``` html
<a href="#about" data-goto-anchor="#about">About</a>
<a href="#feature" data-goto-anchor=".feature" data-goto-anchor="50">Feature</a>
↓↓↓
<section id="about">...</section>
<section class="feature">...</section>
```
