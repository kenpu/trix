Angular Lego
============

This trix is to implement a movable lego set using Angular.

# Data model

    type Row struct {
        WithId
        WithTitle
        cols []Column
    }

    type Column struct {
        WithId
        WithTitle
        contentType ContentType
        content     string
        width       int     // 0: auto, 0<w<=12: span
    }

    var document struct {
        WithID
        WithTitle
        withMeta    // with author and editorial history
        rows        []Row
    }

# Algebra

Here we introduce a set of modification operations.  These would include:

- create new row
- delete exist row, x, provided that len(document.rows) > 1
- create / delete columns
- reorder rows
- reorder columns
- move columns
- resize columns

# MVP

- Rows are mapped to slides.  There dimensions are fixed to a width
  of 1024px, and a wide-screen aspect ratio.

  Each row has an outer container that may have 100% screen width.

- Each column has a inner container that introduces some margin.

- Columns are draggable.

# DOM structure


<container ng-repeat="row in document.rows">
    <div .container>
        <div .row>
        </div>
    </div>
</container>
