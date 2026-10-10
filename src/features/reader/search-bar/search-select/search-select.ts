import { Component, computed, signal, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  selector: 'search-select',
  styleUrl: './search-select.scss',
  templateUrl: './search-select.html',
})
export class SearchSelect {
  placeholder = input.required<string>();
  options = input.required<Array<{ id: string; value: string }>>();
  selectedValue = model<string>('');
  outputValue = output<{ id: string; value: string }>();

  searchQuery = signal<string>('');

  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const allOptions = this.options();
    if (!query) return allOptions;
    return allOptions.filter((opt) => opt.value.toLowerCase().includes(query));
  });

  clearSearch(event: Event) {
    event.stopPropagation();
    this.searchQuery.set('');
  }

  valueChange(event: { id: string; value: string }) {
    this.outputValue.emit(event);
    this.searchQuery.set('');
  }
}
